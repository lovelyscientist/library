<?php
if (strpos($_SERVER['REQUEST_URI'],'.') === false) {
	$dbConnection = new mysqli('127.0.0.1', 'root', 'xxx', 'library');
	$method = $_SERVER['REQUEST_METHOD'];
	$request_uri = $_SERVER['REQUEST_URI'];
	$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
	$input = json_decode(file_get_contents('php://input'));

	if ($input !== null) {
		$array = get_object_vars($input);
		$columns = preg_replace('/[^a-z0-9_]+/i','', array_keys($array));

		$values = array_map(function ($value) use ($dbConnection) {
		  if ($value === null) return null;
		  return  $dbConnection->real_escape_string((string)$value);
		},array_values($array));

		for ($i = 0; $i < count($columns); $i++) {
		  $set.=($i>0?',':'').'`'.$columns[$i].'`=';
		  $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
		}

		$percent = (int)$values[0];
	}

	switch ($request_uri) {
	  case '/library/book-all': $sql = "SELECT * FROM books;"; break;
	  case '/library/reader-all': $sql = "SELECT * FROM readers;"; break;
	  case '/library/order-all': $sql = "SELECT * FROM readers INNER JOIN orders ON readers.id = orders.reader_id;"; break;
	  case '/library/book-report-author': $sql = "SELECT author, COUNT(books.id) FROM books GROUP BY author;"; break;
	  case '/library/book-report-alphabet': $sql = "SELECT * FROM books ORDER BY title;"; break;
	  case '/library/reader-add': $sql = "INSERT INTO readers SET $set"; break;
	  case '/library/reader-report-phone': $sql = "SELECT name, surname, phone FROM readers ORDER BY name"; break;
	  case '/library/order-report-current': $sql = "SELECT * FROM readers INNER JOIN orders ON readers.id = orders.reader_id WHERE (orders.end_date > CURDATE()  AND orders.begin_date < CURDATE())"; break;
	  case '/library/book-remove': $sql = "DELETE FROM books WHERE $set"; break;
	  case '/library/book-sale': $sql = "UPDATE books SET rent_price=rent_price+(rent_price*$percent*0.01);"; break;
	}

	$result = $dbConnection->query($sql);

	returnResult($method, $result);

	$dbConnection->close();

	return true;
}
return false;

function returnResult($method, $dbResponse) {
	if ($method == 'GET') {
	  echo '[';
	  for ($i=0; $i<$dbResponse->num_rows; $i++) {
	    echo ($i>0 ? ',' : '').json_encode($dbResponse->fetch_object());
	  }
	  echo ']';
	}  else {
	  echo '[]';
	}
}

/*class LibraryDatabase {
      var $price;
      var $title;
      
      Member functions 
      function setPrice($par){
         $this->price = $par;
      }
      
      function getPrice(){
         echo $this->price ."<br/>";
      }
      
      function setTitle($par){
         $this->title = $par;
      }
      
      function getTitle(){
         echo $this->title ." <br/>";
      }
   }
*/