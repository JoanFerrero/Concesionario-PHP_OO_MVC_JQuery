<?php
    if ((isset($_GET['module'])) && ($_GET['module']==="ctrl_home") ){
		include("view/inc/top_page.html");
		include("view/inc/top_page_home.html");
		include("view/inc/top_page_search.html");
	}else if ((isset($_GET['module'])) && ($_GET['module']==="ctrl_cars") ){
		include("view/inc/top_page_cars.html");
		include("view/inc/top_page_search.html");
	}else if ((isset($_GET['module'])) && ($_GET['module']==="ctrl_shop") ){
		include("view/inc/top_page.html");
		include("view/inc/top_page_shop.html");
		include("view/inc/top_page_search.html");
	}else if ((isset($_GET['module'])) && ($_GET['module']==="ctrl_contact") ){
		include("view/inc/top_page.html");
		include("view/inc/top_page_search.html");
	}else if((isset($_GET['module'])) && ($_GET['module']==="ctrl_login")){	
		include("view/inc/top_page.html");
		include("view/inc/top_page_login.html");
	}else {
		include("view/inc/top_page_home.html");
		include("view/inc/top_page_search.html");
	}
	session_start();
?>
<div id="wrapper">		
    <div id="header">    	
    	<?php
    	    include("view/inc/header.html");
    	?>
    </div>  
    <div id="menu">
		<?php
		    include("view/inc/menu.html");
		?>
    </div>	
    <div id="">
    	<?php
		    include("view/inc/pages.php"); 
		?>
        <br style="clear:both;" />
    </div>
    <div id="footer">   	   
	    <?php
	        include("view/inc/footer.html");
	    ?>
    </div>
</div>

