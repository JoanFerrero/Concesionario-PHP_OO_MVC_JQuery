<?php
	class connect{
		public static function con(){

            $servername = "localhost";
            $username = "root";
            $password = "D2r71mn49O";
            $databaseName = "Concesionario";
			
    		$conexion = mysqli_connect($servername, $username, $password, $databaseName);
			if (!$conexion) {
				die("Connection failed: " . mysqli_connect_error());
			}
			return $conexion;
		}
		public static function close($conexion){
			mysqli_close($conexion);
		} 
	}
?>