<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/Concesionario2/';
    include($path . "module/home/model/DAOHome.php");
    session_start();
	if (isset($_SESSION["tiempo"])) {  
	    $_SESSION["tiempo"] = time(); 
	}
    switch ($_GET['op']) {
        case 'list';
            
            include ('module/home/view/homepage.html');

            break;
        case 'homePageSlide';

            try{
                $dao = new DAOHome();
                $rdo = $dao->homePageSlide();
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
            
        case 'homeBrands';
        
            try{
                $dao = new DAOHome();
                $rdo = $dao->homeBrands();
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

        case 'homeType';
        
            try{
                $dao = new DAOHome();
                $rdo = $dao->homeType();
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

        default;
            include ('module/home/view/homepage.html');
            break;
    }
    ?>