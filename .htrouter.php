<?php

require_once('LibraryClass.php');

if (strpos($_SERVER['REQUEST_URI'],'.') === false) {
	$library = new LibraryDatabase();
	
	$library->createSet()->defineSqlRequest()->getData()->returnResult()->closeConnection();

	return true;
}

return false;
?>