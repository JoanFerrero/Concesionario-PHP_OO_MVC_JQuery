<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '/Concesionario2/';
include($path . "/model/connect.php");

class DAOSearch {

    function all_category(){
        $sql = "SELECT DISTINCT c.category_name FROM categories c";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function all_brands($opcion){
        $sql = "SELECT DISTINCT b.brand_name, b.id_brand
                FROM cars c
                INNER JOIN brand b
                ON b.id_brand=c.id_brand
                INNER JOIN categories ca
                ON c.id_category=ca.id_category
                WHERE ca.category_name='" . $opcion . "'";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function city_auto_category_brand($complet, $category, $brand){
        $sql = "SELECT DISTINCT c.town 
                FROM cars c
                INNER JOIN categories ca
                ON c.id_category = ca.id_category
                INNER JOIN brand b 
                ON c.id_brand = b.id_brand
                WHERE b.brand_name = '" . $brand . "'
                AND ca.category_name = '" . $category . "'
                AND c.town LIKE '$complet%'";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function city_auto_category($complet, $category) {
        $sql = "SELECT DISTINCT c.town 
                FROM cars c
                INNER JOIN categories ca
                ON c.id_category = ca.id_category
                WHERE ca.category_name = '" . $category . "'
                AND c.town LIKE '$complet%'";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function city_auto($complet){
        $sql = "SELECT DISTINCT c.town
                FROM cars c
                WHERE c.town LIKE '$complet%'";
    
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res; 
    }
}

?>