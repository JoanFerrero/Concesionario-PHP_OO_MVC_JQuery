function protecturl(time) {
    var token = localStorage.getItem('token');
    ajaxPromise('module/login/ctrl/ctrl_login.php?op=controluser', 
    'POST', 'JSON', {token: token})
    .then(function(result) {
        if (result=="ok"){
            if (time == 0){
                toastr["warning"]("Debes realizar login");
                time++;
            }
            setInterval(function(){
                logout_control();
            }, 5000);
        }
    }).catch(function() {});
}

function protecttime(time){
    setInterval(function(){
        ajaxPromise('module/login/ctrl/ctrl_login.php?op=actividad', 
        'POST', 'JSON')    
        .then(function(result) {
            if(result=="inactivo"){
                if (time == 0){
                    toastr["warning"]("Se va ha cerrar la cuenta por inactividad.");
                    time++;
                }
                setInterval(function(){
                    logout();
                }, 5000);
            }
        }).catch(function() {
            console.log("error");
            //window.location.href = 'index.php?module=exceptions&op=503&error=error_login'; 
        });
    }, 600000);    
}

function regeneratetoken(){
    setInterval(function(){
        var token = localStorage.getItem('token');
        ajaxPromise('module/login/ctrl/ctrl_login.php?op=refresh_token', 
            'POST', 'JSON', {token: token})
        .then(function(result) {
            localStorage.setItem("token", result);
            console.log(localStorage);
        }).catch(function() {});
    }, 600000);
}

$(document).ready(function(){
    protecttime(time = 0);
	protecturl(time = 0);
    regeneratetoken();
});