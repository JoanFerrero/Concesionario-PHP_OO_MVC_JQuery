<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/Concesionario2/';
    include($path . "module/shop/model/DAOShop.php");
    include ($path . "view/inc/JWT.php");
    session_start();
	if (isset($_SESSION["tiempo"])) {  
	    $_SESSION["tiempo"] = time();
	}
    switch($_GET['op']){
        case 'list';
        
            include('module/shop/view/shoppage.html');
            
            break;
        case 'allcars';
            
            try{  
                $dao = new DAOShop();
                $rdo = $dao->allcars($_GET['items_page'], $_GET['total_prod']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }
            break;
            
        case 'onecar';
            
            try{
                $dao = new DAOShop();
                $car = $dao->onecar();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }

            try{
                $dao1 = new DAOShop();
                $img = $dao1->img_car();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }

            if(!($car||$img)) {
                echo json_encode("error");
                exit;
            } else {
                $rdo = array();
                $rdo[0] = $car;
                $rdo[1][] = $img;
                echo json_encode($rdo);
            }
            break;
        case 'filters_search';

            try{  
                $dao_filters = new DAOShop();
                $where = $dao_filters->sql_query_filters($_GET['brand'], $_GET['kilometros'], 
                                                        $_GET['type'], $_GET['setting'], 
                                                        $_GET['category'], $_GET['order']);
                $rdo = $dao_filters ->all_cars_filters($where, $_GET['items_page'], $_GET['total_prod']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }

            break;
        case 'search_Menu';

            try{  
                $dao_filters = new DAOShop();
                $where = $dao_filters->sql_query_search($_GET['brand_search'], $_GET['category_search'], 
                                                        $_GET['autocom_search']);
                $rdo = $dao_filters ->all_cars_filters($where, $_GET['items_page'],$_GET['total_prod']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }

            break;
        case 'update_count';
            try{  
                $dao_update = new DAOShop();
                $rdo = $dao_update ->update_count($_GET['id_count']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            break;
        case 'count_allcars';    
            try{
                $dao = new DAOShop();
                $rdo = $dao->select_count();
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }
            break;
        case 'count_filters_search';    
            try{
                $dao = new DAOShop();
                $where = $dao->sql_query_filters($_GET['brand'], $_GET['kilometros'], 
                                                        $_GET['type'], $_GET['setting'], 
                                                        $_GET['category'], $_GET['order']);
                $rdo = $dao ->count_cars_filters($where);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }
            break;
        case 'count_search_Menu';    
            try{
                $dao = new DAOShop();
                $where = $dao->sql_query_search($_GET['brand_search'], $_GET['category_search'], 
                                                        $_GET['autocom_search']);
                $rdo = $dao ->count_cars_filters($where);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }
            break;
        case 'count_related';
            try{
                $dao = new DAOShop();
                $rdo = $dao ->count_cars_filter($_GET['category'], $_GET['id']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }
            break;
        case 'more_related';
            try{
                $dao = new DAOShop();
                $rdo = $dao ->more_related($_GET['category'], $_GET['id'], $_GET['items'], $_GET['loaded']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }
            break;
        case 'load_likes';    
            try{

                $archivo = "/var/www/html/Concesionario2/model/jwt.ini";
                $jwt = parse_ini_file($archivo, true);

                $token = $_POST['token'];
                $secret = $jwt['primera_sección']['secret'];

                $JWT = new JWT;
                $json = $JWT->decode($token, $secret);  
                $json = json_decode($json, TRUE);

                $dao = new DAOShop();
                $rdo = $dao->select_load_likes($json['username']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }
                echo json_encode($dinfo);
            }
            break;
        case 'control_likes';    
            try{

                $archivo = "/var/www/html/Concesionario2/model/jwt.ini";
                $jwt = parse_ini_file($archivo, true);

                $token = $_POST['token'];
                $secret = $jwt['primera_sección']['secret'];
                
                $JWT = new JWT;
                $json = $JWT->decode($token, $secret);  
                $json = json_decode($json, TRUE);

                $dao = new DAOShop();
                $rdo = $dao->select_likes($_POST['id'], $json['username']);
                
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }

            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $dinfo = array();
                foreach ($rdo as $row) {
                    array_push($dinfo, $row);
                }
                if(count($dinfo) === 0){
                    $dao = new DAOShop();
                    $rdo = $dao->insert_likes($_POST['id'], $json['id']);
                    echo json_encode('0');
                }else{
                    $dao = new DAOShop();
                    $rdo = $dao->delete_likes($_POST['id'], $dinfo[0]['id_user']);
                    echo json_encode('1');
                }
            }
            break;
            
        default;
            include ('module/shop/view/shoppage.html');
            break;
    }
?>