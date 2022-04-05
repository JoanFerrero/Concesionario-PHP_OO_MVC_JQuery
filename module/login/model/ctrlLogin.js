$(document).ready(function () {
    key_login();
    button_login();
    console.log(localStorage);
});

function key_login(){
	$("#login__form").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
        	e.preventDefault();
            login();
        }
    });
}

function button_login(){
	$('#login').on('click', function(e) {
        e.preventDefault();
        login();
    }); 
}

function login(){
    if(validate_login() != 0){
        var data = $('#login_form').serialize();
        ajaxPromise('module/login/ctrl/ctrl_login.php?op=login', 
        'POST', 'JSON', data)    
        .then(function(result) {
            if(result=='error'){
                console.log("hola");
                $("#error_password").html('La contraseña no es correcta');
            } else {
                localStorage.setItem("token", result);
                var zone = localStorage.getItem('zone');
                if (zone == 'shop') {
                    setTimeout('window.location.href = "index.php?module=ctrl_shop&op=list"; ',200);
                } else {
                    setTimeout('window.location.href = "index.php?module=ctrl_home&op=list"; ',200);
                }
            }
        }).catch(function() {
            //window.location.href = 'index.php?module=exceptions&op=503&error=error_login'; 
        });
    }
}

function validate_login(){
    var error = false;

	if(document.getElementById('username').value.length === 0){
		document.getElementById('error_username').innerHTML = "Tienes que escribir el usuario";
		error = true;
	}else{
        document.getElementById('error_username').innerHTML = "";
    }
	
	if(document.getElementById('password').value.length === 0){
		document.getElementById('error_password').innerHTML = "Tienes que escribir la contraseña";
		error = true;
	}else{
        document.getElementById('error_password').innerHTML = "";
    }
	
    if(error == true){
        return 0;
    }
}