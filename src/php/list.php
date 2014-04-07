<?php require_once('connect.php');?>
<?php
	//======================================
	//list.php	J.Tanksley	03/21/2014\
	// Populate Select drop downs from mysql
	//
	//======================================
	$catQuery = $dbh->prepare('SELECT c.name FROM categories c ORDER BY c.name ASC');
	$catQuery->execute();
	$cData = $catQuery->fetchAll();	
	$jsonArray['categories'] = array();
	
	foreach ($cData as $row){
		$postData = array();
		$postData['name'] = $row['name'];
		array_push($jsonArray['categories'],$postData);
	}
	$jsonData = json_encode($jsonArray);
	//for testing purposes gonna turn the category query into a json file and call it.
	$file = 'categories.json';
	file_put_contents($file, $jsonData);
	
?>