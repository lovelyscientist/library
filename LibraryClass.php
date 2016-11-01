<?php
class LibraryDatabase {
	public $set;
	public $result;
	public $percent;

	public function __construct() {
        $this->dbConnection = new mysqli('127.0.0.1', 'root', 'xxx', 'library');
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->request_uri = $_SERVER['REQUEST_URI'];
        $this->request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
        $this->input = json_decode(file_get_contents('php://input'));
    }
	   
	public function createSet(){
	    if ($this->input !== null) {
			$array = get_object_vars($this->input);
			$columns = preg_replace('/[^a-z0-9_]+/i','', array_keys($array));

			$values = array_map(function ($value) {
			  if ($value === null) return null;
			  return  $this->dbConnection->real_escape_string((string)$value);
			},array_values($array));

			for ($i = 0; $i < count($columns); $i++) {
			  $set.=($i>0?',':'').'`'.$columns[$i].'`=';
			  $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
			}

			$percent = (int)$values[0];

			$this->set = $set;
			$this->percent = $percent;
		}
	}

	public function defineSqlRequest() {
		switch ($this->request_uri) {
		  case '/library/book-all': $sql = "SELECT * FROM books;"; break;
		  case '/library/reader-all': $sql = "SELECT * FROM readers;"; break;
		  case '/library/order-all': $sql = "SELECT * FROM readers INNER JOIN orders ON readers.id = orders.reader_id;"; break;
		  case '/library/book-report-author': $sql = "SELECT author, COUNT(books.id) FROM books GROUP BY author;"; break;
		  case '/library/book-report-alphabet': $sql = "SELECT * FROM books ORDER BY title;"; break;
		  case '/library/reader-add': $sql = "INSERT INTO readers SET $this->set"; break;
		  case '/library/reader-report-phone': $sql = "SELECT name, surname, phone FROM readers ORDER BY name"; break;
		  case '/library/order-report-current': $sql = "SELECT * FROM readers INNER JOIN orders ON readers.id = orders.reader_id WHERE (orders.end_date > CURDATE()  AND orders.begin_date < CURDATE())"; break;
		  case '/library/book-remove': $sql = "DELETE FROM books WHERE $this->set"; break;
		  case '/library/book-sale': $sql = "UPDATE books SET rent_price=rent_price+(rent_price*$this->percent*0.01);"; break;
		}

		$this->sql = $sql;
	}

	public function getData() {
		$this->result = $this->dbConnection->query($this->sql);
	}
	
	public function returnResult() {
		if ($this->method == 'GET') {
		  echo '[';
		  for ($i=0; $i<$this->result->num_rows; $i++) {
		    echo ($i>0 ? ',' : '').json_encode($this->result->fetch_object());
		  }
		  echo ']';
		}  else {
		  echo '[]';
		}
	}

	public function closeConnection() {
		$this->dbConnection->close();
	}
}
return false;
?>