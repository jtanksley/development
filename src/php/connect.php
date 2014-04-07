<?php 
	//=======================================
	// Connect.php	J.Tanksley 	03/21/2014
	// Using this to connect to the database
	//=======================================
	
	$hostname = 'localhost';
	$username = 'root';
	$password = '';
	$dbname = 'tanksleytales_db';
	
	//Set up a PDO connection
	try{
		$dbh = new PDO("mysql:host=$hostname;dbname=$dbname",$username,$password);
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		echo 'Your database connection has been established <br/>';
		
	}
	catch(PDOException $e){
		echo $e->getMessage();
	}
?>