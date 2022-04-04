function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
}

/*==================== LOAD MENU ====================*/
function load_menu() {
    $('<div></div>').attr('class',"navbar-nav mr-auto").appendTo(".navbar-nav").html( 
        '<a href="index.php?module=ctrl_home&op=list" class="nav-item nav-link">Home</a>'+
        '<a href="index.php?module=ctrl_shop&op=list" class="nav-item nav-link">shop</a>'+
        '<a href="index.php?module=ctrl_contact" class="nav-item nav-link">Contact</a>'
    )
    token = localStorage.getItem('token');
    ajaxPromise('module/login/ctrl/ctrl_login.php?op=data_user', 
    'POST', 'JSON', {token: token})
    .then(function(data) {
        if (data.type_user === 'admin') {
            menu_client(data);
        }else if (data.type_user === 'client') {
            menu_client(data);
        }
    }).catch(function() {
        $('<div></div>').attr('class',"ml-auto").appendTo(".ml-auto").html( 
            '<a class="btn btn-custom" href="index.php?module=ctrl_login&op=login_view">Login</a>'
        )
    });
}

/*==================== MENUS ====================*/
function menu_admin(data) {
    $('<div></div>').attr('class',"ml-auto").appendTo(".ml-auto").html( 
        '<a class="btn btn-custom" id="logout" href="">Log out</a>'
    )

    $('<div></div>').attr('class',"").appendTo(".ml-auto").html(
        '<div class="circular--portrait">'+
        '<img src="'+data.avatar_user+'" style = "max-width: 100%; max-height: 50px;"/>'+
        '</div>'
    )
}

function menu_client(data) {
    $('<div></div>').attr('class',"ml-auto").appendTo(".ml-auto").html( 
        '<a class="btn btn-custom" id="logout" href="">Log out</a>'
    )

    $('<div></div>').attr('class',"").appendTo(".perfil").html(
        '<div class="circular--portrait">'+
        '<img src="'+data.avatar_user+'" style = "max-width: 100%; max-height: 50px;"/>'+
        '</div>'
    )
}

/*==================== CLICK LOGOUT ====================*/
function click_logout() {
    $(document).on('click', '#logout', function() {
        logout();
    });
}

/*==================== LOGOUT ====================*/
function logout() {
    ajaxPromise('module/login/ctrl/ctrl_login.php?op=logout', 
    'POST', 'JSON')
    .then(function(data) {
        localStorage.removeItem('token');
        var zone = localStorage.getItem('zone');
        if (zone == 'shop') {
            setTimeout('window.location.href = "index.php?module=ctrl_shop&op=list"; ',200);
        } else {
            setTimeout('window.location.href = "index.php?module=ctrl_home&op=list"; ',200);
        }
    }).catch(function() {
        console.log('error_logout');
    });
}

function logout_control() {
    ajaxPromise('module/login/ctrl/ctrl_login.php?op=logout', 
    'POST', 'JSON')
    .then(function(data) {
        localStorage.removeItem('token');
        window.location.href = "index.php?module=ctrl_login&op=login_view";
    }).catch(function() {
        console.log('error_logout');
    });
}

$(document).ready(function() {
    load_menu();
    click_logout();
});