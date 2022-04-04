<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/Concesionario2/';
    include($path . "module/login/model/DAOLogin.php");
    include ($path . "view/inc/JWT.php");
    session_start();

    switch ($_GET['op']) {
        case 'login_view';
            include("module/login/view/login.html");
            break;

        case 'register_view';
            include("module/login/view/register.html");
            break;
        case 'register';
            $dao_register = new DAOLogin();
            if($dao_register->select_email($_POST['email'])==1){
                echo json_encode("error");
            } else {
                try{
                    $rdo = $dao_register->insert_user($_POST['username'], $_POST['email'], $_POST['password']);
                }catch (Exception $e){
                    echo json_encode("error");
                    exit;
                }
                if(!$rdo){
                    echo json_encode("error");
                    exit;
                }else{
                    echo json_encode("ok");
                    exit;
                }
            }
            break;
        case 'login';
            try{
                $dao_login = new DAOLogin();
                $rdo = $dao_login->select_user($_POST['username']);
                $archivo = "/var/www/html/Concesionario2/model/jwt.ini";
                $jwt = parse_ini_file($archivo, true);
                $header = $jwt['primera_sección']['header'];
                $secret = $jwt['primera_sección']['secret'];
                $payload = '{"iat":"'.time().'","exp":"'.time() + (60*60).'","username":"'.$rdo["username"].'","id":"'.$rdo["id_user"].'"}';
                
                $JWT = new JWT;
                $token = $JWT->encode($header, $payload, $secret);

            }catch (Exception $e){
                echo json_encode("error");
                exit;                
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{ 
                
                if (password_verify($_POST['password'], $rdo['password_user'])) {
					$_SESSION['user'] = $rdo['username'];
					$_SESSION['tiempo'] = time();
					echo json_encode($token);
	                exit;
				} else {
                    echo json_encode("error");
                    exit;
				}
            }
            break;
        case 'logout':
            unset($_SESSION['user']);
            unset($_SESSION['tiempo']);
            session_destroy();

			echo json_encode('Done');
            break;
        case 'data_user':
            $archivo = "/var/www/html/Concesionario2/model/jwt.ini";
            $jwt = parse_ini_file($archivo, true);
            $secret = $jwt['primera_sección']['secret'];
            $token = $_POST['token'];

            $JWT = new JWT;
            $json = $JWT->decode($token, $secret);  
            $json = json_decode($json, TRUE);

            $dao = new DAOLogin();
            $rdo = $dao->select_data($json['username']);
            echo json_encode($rdo);
            exit;
            break;
        case 'actividad':
            if(isset($_SESSION["user"])) {
                if (!isset($_SESSION["tiempo"])) {  
                    echo json_encode("inactivo");
                    exit(); 
                } else {  
                    if((time() - $_SESSION["tiempo"]) >= 1800) {  
                        echo json_encode("inactivo"); 
                        exit();
                    }else{
                        echo json_encode("activo"); 
                        exit();
                    }
                }
            }else {
                echo json_encode("null");
            }
            break;
        case 'controluser':
            $archivo = "/var/www/html/Concesionario2/model/jwt.ini";
            $jwt = parse_ini_file($archivo, true);
            $secret = $jwt['primera_sección']['secret'];
            $token = $_POST['token'];

            $JWT_token = new JWT;
            $json = $JWT_token->decode($token, $secret);  
            $json = json_decode($json, TRUE);
            
            if (isset($_SESSION['user']) || $_SESSION['user'] == $json['username']){
                echo json_encode("okey");
                exit();
            } else if ($_SESSION['user'] != $json['username']){
                echo json_encode("ok");
                exit();  
            }
            break;
        case 'refresh_token':
            try {
                $archivo = "/var/www/html/Concesionario2/model/jwt.ini";
                $jwt = parse_ini_file($archivo, true);
                $secret = $jwt['primera_sección']['secret'];
                $token = $_POST['token'];

                $JWT = new JWT;
                $json = $JWT->decode($token, $secret);  
                $json = json_decode($json, TRUE);

                $dao_login = new DAOLogin();
                $rdo = $dao_login->select_user($json['username']);

                $header = $jwt['primera_sección']['header'];
                $payload = '{"iat":"'.time().'","exp":"'.time() + (60*60).'","username":"'.$rdo["username"].'","id":"'.$rdo["id_user"].'"}';
                
                $JWT = new JWT;
                $token = $JWT->encode($header, $payload, $secret);
            }catch (Exception $e){
                echo json_encode("error");
                exit;                
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{ 
                echo json_encode($token);
            }
            break;
        default:
            include("view/inc/error404.php");
            break;
    }