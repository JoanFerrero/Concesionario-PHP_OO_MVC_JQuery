<?php

    $path = $_SERVER['DOCUMENT_ROOT'] . '/Concesionario2/';
    include($path . "/model/connect.php");

    class DAOHome {
        
        function homePageSlide() { 
            $sql = "SELECT * FROM brand";

            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);

            return $res;
        }

        function homeBrands() { 
            $sql = "SELECT * FROM categories LIMIT 3";

            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            
            return $res;
        }

        function homeType() { 
            $sql = "SELECT * FROM type LIMIT 3";

            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            
            return $res;
        }
        
    }
