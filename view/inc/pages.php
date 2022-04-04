<?php
if(isset($_GET['module'])){
	switch($_GET['module']){
		case "ctrl_login";
			include("module/login/ctrl/".$_GET['module'].".php");
			break;
		case "ctrl_home";
			include("module/home/ctrl/".$_GET['module'].".php");
			break;
		case "ctrl_cars";
			include("module/cars/ctrl/".$_GET['module'].".php");
			break;
		case "ctrl_shop";
			include("module/shop/ctrl/".$_GET['module'].".php");
			break;
		case "exceptions";
			include("module/".$_GET['module']."/ctrl/ctrl_".$_GET['module'].".php");
			break;
		case "ctrl_contact";
			include("module/contact/contact.html");
			break;
		default;
			include("module/home/view/homepage.html");
			break;
	}
} else {
	include("module/home/view/homepage.html");
}
?>