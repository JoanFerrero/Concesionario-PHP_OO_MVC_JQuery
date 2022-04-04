<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/Concesionario2/';
    include($path . "module/exceptions/model/DAOExceptions.php");

    session_start();
    switch($_GET['op']){
        case "404";
            $DAOExceptions = new DAOExceptions;
            $DAOExceptions -> insert_exception();
            include("module/exceptions/view/inc/error404.php");
        break;

        case "503";
            
            $DAOExceptions = new DAOExceptions;
            $DAOExceptions -> insert_exception();
            include("module/exceptions/view/inc/error503.php");
        break;
    }