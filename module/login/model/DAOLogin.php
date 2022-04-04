<?php

    $path = $_SERVER['DOCUMENT_ROOT'] . '/Concesionario2/';
    include($path . "/model/connect.php");

    class DAOLogin {

        function select_email($email){
			$sql = "SELECT u.email_user FROM users u WHERE u.email_user='". $email ."'";

			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
		}

        function insert_user($username, $email, $password){
            $hashed_pass = password_hash($password, PASSWORD_DEFAULT, ['cost' => 6]);
            $hashavatar = md5(strtolower(trim($email))); 
            $avatar = "https://robohash.org/$hashavatar";
            $sql ="INSERT INTO users (username, password_user, email_user, type_user, avatar_user)
            VALUES ('$username','$hashed_pass','$email','client','$avatar')";

            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
        }

        function select_user($username){
            $sql = "SELECT u.id_user, u.username, u.password_user, u.email_user, u.type_user, u.avatar_user 
            FROM users u WHERE u.username='$username'";

            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            $value = get_object_vars($res);
            return $value;
        }

        function select_data($username){
            $sql = "SELECT u.username, u.password_user, u.email_user, u.type_user, u.avatar_user 
            FROM users u WHERE u.username='$username'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
        }
    }