<?php

require_once('LibraryClass.php');

if (strpos($_SERVER['REQUEST_URI'],'.') === false) {
	$library = new LibraryDatabase();
	
	$library->createSet();
	$library->defineSqlRequest();
	$library->getData();
	$library->returnResult();
	$library->closeConnection();

	return true;
}

return false;
?>