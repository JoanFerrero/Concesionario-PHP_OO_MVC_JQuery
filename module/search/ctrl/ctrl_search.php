<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/Concesionario2/';
    include($path . "module/search/model/DAOSearch.php");
    session_start();
	if (isset($_SESSION["tiempo"])) {  
	    $_SESSION["tiempo"] = time();
	}

    switch($_GET['op']){
        case 'firstdrop';

            try{
                $DAOsearch = new DAOSearch();
                $rdo = $DAOsearch->all_category();
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
        case 'seconddrop';

            try{
                $DAOsearch = new DAOSearch();
                $rdo = $DAOsearch->all_brands($_GET['category']);
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
        case 'autocomplit';

            try{
                $DAOsearch = new DAOSearch();
                if (($_GET['drop_category'] != 'undefined') && ($_GET['drop_brands'] != 'undefined')){
                    $rdo = $DAOsearch->city_auto_category_brand($_GET['complet'], $_GET['drop_category'], $_GET['drop_brands']); 
                } else if($_GET['drop_category'] != 'undefined'){
                    $rdo = $DAOsearch->city_auto_category($_GET['complet'], $_GET['drop_category']);
                } else {
                    $rdo = $DAOsearch->city_auto($_GET['complet']);
                }
            } catch(Exception $e){
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
    }


?>
