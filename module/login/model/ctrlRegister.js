$(document).ready(function () {
    button_register();
    key_register();
});

function button_register(){
    $('#register').on('click', function(e) {
        e.preventDefault();
        register();
    }); 
}

function key_register(){
	$("#register__form").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
        	e.preventDefault();
            register();
        }
    });
}

function register(){
    //if(validate_register() != 0){
        var data = $('#register_form').serialize();
        console.log(data);
        ajaxPromise('module/login/ctrl/ctrl_login.php?op=register', 
        'POST', 'JSON', data)    
        .then(function(result) {
            console.log(result);
            if(result == "error"){		
                $("#error_email").html('El email o usuario ya esta registrado');
            }else{
                setTimeout(' window.location.href = "index.php?module=ctrl_login&op=login_view"; ',1000);
            }
        }).catch(function() {
            window.location.href = 'index.php?module=exceptions&op=503&error=error_register'; 
        });
    //}
}

function validate_register(){
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

	if(document.getElementById('username').value.length === 0){
		document.getElementById('error_username').innerHTML = "Tienes que escribir el usuario";
		error = true;
	}else{
        if(document.getElementById('username').value.length < 8){
            document.getElementById('error_username').innerHTML = "El username tiene que tener 8 caracteres como minimo";
            error = true;
        }else{
            document.getElementById('error_username').innerHTML = "";
        }
    }

    if(document.getElementById('email').value.length === 0){
		document.getElementById('error_email').innerHTML = "Tienes que escribir un correo";
		error = true;
	}else{
        if(!mail_exp.test(document.getElementById('email').value)){
            document.getElementById('error_email').innerHTML = "El formato del mail es invalido"; 
            error = true;
        }else{
            document.getElementById('error_email').innerHTML = "";
        }
    }
	
	if(document.getElementById('password').value.length === 0){
		document.getElementById('error_password').innerHTML = "Tienes que escribir la contraseña";
		error = true;
	}else{
        if(document.getElementById('password').value.length < 8){
            document.getElementById('error_password').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        }else{
            document.getElementById('error_password').innerHTML = "";
        }
    }
	
    if(error == true){
        return 0;
    }

}