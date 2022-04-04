<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/Concesionario2/';
    include($path . "/model/connect.php");
    
    class DAOExceptions {

        function insert_exception(){

           $Exception = $_GET['op'];
           $Error = $_GET['error'];

        $sql = " INSERT INTO Exceptions(Exception, TimeException, Error)"
                . "VALUES ('$Exception', CURTIME(), '$Error')";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);

        connect::close($conexion);
        return $res;

        }
    }
?>