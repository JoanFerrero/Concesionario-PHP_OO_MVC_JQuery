<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '/Concesionario2/';
include($path . "/model/connect.php");

class DAOShop {
    
    function allcars($items_page, $total_prod) {
        $sql = "SELECT c.id, c.province, c.fecha, c.price, b.brand_name, m.model_name, t.type_name, ca.category_name, c.img_car, c.kilometres, c.lat, c.lon
                    FROM cars c
                    INNER JOIN brand b
                    ON b.id_brand=c.id_brand
                    INNER JOIN model m
                    ON m.id_model=c.id_model
                    INNER JOIN type t
                    ON t.id_type=c.id_type
                    INNER JOIN categories ca
                    ON ca.id_category=c.id_category
                    ORDER BY c.count DESC LIMIT " . $total_prod . "," . $items_page;
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function onecar() {
        $modal = $_GET['modal'];
        $sql = "SELECT c.id, b.brand_name, m.model_name, c.price, c.province, c.town, c.puertas, i.img_car, c.lat, c.lon, c.fecha, ca.category_name
                    FROM cars c
                    INNER JOIN brand b
                    ON b.id_brand=c.id_brand
                    INNER JOIN model m
                    ON m.id_model=c.id_model
                    INNER JOIN type t
                    ON t.id_type=c.id_type
                    INNER JOIN categories ca
                    ON ca.id_category=c.id_category
                    INNER JOIN img i
                    where c.id='$modal'" ;
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $retrArray = array();
        if(mysqli_num_rows($res) > 0) {
            while($row = mysqli_fetch_assoc($res)){
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }

    function img_car() {
        $modal = $_GET['modal'];
        $sql = "SELECT * FROM img i
                WHERE id_img ='$modal'";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $retrArray = array();
        if(mysqli_num_rows($res) > 0) {
            while($row = mysqli_fetch_assoc($res)){
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }

    function all_cars_filters($WHERE, $items_page, $total_prod){
     
        $sql = "SELECT c.id, c.province, c.fecha, c.price, b.brand_name, m.model_name, t.type_name, ca.category_name, c.img_car, c.kilometres, c.lat, c.lon
                    FROM cars c
                    INNER JOIN brand b
                    ON b.id_brand=c.id_brand
                    INNER JOIN model m
                    ON m.id_model=c.id_model
                    INNER JOIN type t
                    ON t.id_type=c.id_type
                    INNER JOIN categories ca
                    ON ca.id_category=c.id_category " . $WHERE . " LIMIT " . $total_prod . "," . $items_page ;
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function sql_query_filters($brand, $kilometros, $type, $setting, $category, $order){

        $num = 0;
        $WHERE= "";

        if($category != '"ALL"') {

            $WHERE = $WHERE . "WHERE c.id_category =" . $category;
            $num = 1;
            
        }

        if($brand != '"ALL"'){
            if($num == 0) {
                $WHERE = $WHERE . "WHERE c.id_brand=" . $brand;
                $num = 1;
            }else{
                $WHERE = $WHERE . " AND c.id_brand=" . $brand ;
            }
        }
        if($kilometros != '"ALL"'){
            if($num == 0) {
                $WHERE = $WHERE . "WHERE c.kilometres >= " . $kilometros;
                $num = 1;
            }else{
                $WHERE = $WHERE . " AND c.kilometres >= " . $kilometros ;
            }
        }
        if($type != '"ALL"'){
            if($num == 0) {
                $WHERE = $WHERE . "WHERE c.id_type =" . $type;
                $num = 1;
            }else{
                $WHERE = $WHERE . " AND c.id_type =" . $type ;
            }
        }
        if($setting != '"ALL"'){
            if($num == 0) {
                $WHERE = $WHERE . "WHERE c.id_setting =" . $setting;
                $num = 1;
            }else{
                $WHERE = $WHERE . " AND c.id_setting =" . $setting ;
            }
        }

        if($order != '"ALL"'){
            if($order == '"1"') {
                $WHERE = $WHERE . " ORDER BY c.price DESC";
            } else if($order == '"2"') {
                $WHERE = $WHERE . " ORDER BY c.kilometres DESC";
            }
        }

        return $WHERE;
    }
    function sql_query_search($brand_search, $category_search, $autocom_search){
        $num = 0;
        $WHERE= "";

        if($brand_search != '""'){
            if($num == 0) {
                $WHERE = $WHERE . "WHERE c.id_brand=" . $brand_search;
                $num = 1;
            }else{
                $WHERE = $WHERE . " AND c.id_brand=" . $brand_search;
            }
        }

        if($category_search != '""'){
            if($num == 0) {
                $WHERE = $WHERE . "WHERE ca.category_name=" . $category_search;
                $num = 1;
            }else{
                $WHERE = $WHERE . " AND ca.category_name=" . $category_search ;
            }
        }

        if($autocom_search != '""'){
            if($num == 0) {
                $WHERE = $WHERE . "WHERE c.town=" . $autocom_search;
                $num = 1;
            }else{
                $WHERE = $WHERE . " AND c.town=" . $autocom_search ;
            }
        }

        return $WHERE;
    }

    function update_count($id) {
        $sql = "UPDATE cars c SET c.count = c.count + 1 WHERE c.id=" . $id;

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function select_count(){
        $sql = "SELECT COUNT(*) AS n_cars FROM cars";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function count_cars_filters($WHERE){
        $sql = "SELECT COUNT(*) AS n_cars
                FROM cars c
                INNER JOIN brand b
                ON b.id_brand=c.id_brand
                INNER JOIN model m
                ON m.id_model=c.id_model
                INNER JOIN type t
                ON t.id_type=c.id_type
                INNER JOIN categories ca
                ON ca.id_category=c.id_category " . $WHERE;

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function count_cars_filter($category, $id){
        $sql = "SELECT COUNT(*) AS n_cars
            FROM cars c
            INNER JOIN brand b
            ON b.id_brand=c.id_brand
            INNER JOIN model m
            ON m.id_model=c.id_model
            INNER JOIN type t
            ON t.id_type=c.id_type
            INNER JOIN categories ca
            ON ca.id_category=c.id_category WHERE ca.category_name= '" . $category . "' AND c.id <>" . $id;

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function more_related($category, $id, $items, $loaded){
        $sql = "SELECT c.id, c.province, c.fecha, c.price, b.brand_name, m.model_name, t.type_name, ca.category_name, c.img_car, c.kilometres, c.lat, c.lon
            FROM cars c
            INNER JOIN brand b
            ON b.id_brand=c.id_brand
            INNER JOIN model m
            ON m.id_model=c.id_model
            INNER JOIN type t
            ON t.id_type=c.id_type
            INNER JOIN categories ca
            ON ca.id_category=c.id_category WHERE ca.category_name='". str_replace(' ', '', $category) . "' AND c.id <>" . $id . ' LIMIT ' . $loaded .','. $items;

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        return $res;
    }

    function select_load_likes($user){
        $sql = "SELECT l.id_vehiculo FROM likes l INNER JOIN users u WHERE u.username='$user'";
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        return $res;
    }

    function select_likes($id, $user){
        $sql = "SELECT l.id_vehiculo, u.username, u.id_user FROM likes l INNER JOIN users u ON u.id_user=l.id_usuario WHERE u.username='$user' AND l.id_vehiculo=$id";
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        return $res;
    }

    function insert_likes($id, $user){
        $sql = "INSERT INTO likes (id_vehiculo, id_usuario) VALUES ($id,$user)";
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        return $res;
    }

    function delete_likes($id, $user){
        $sql = "DELETE FROM likes WHERE id_usuario=$user AND id_vehiculo=$id";
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        return $res;
    }
}