<?php

require_once 'config.php';

global $dbc;

$stmt = $dbc->query('SELECT * FROM products');
 
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
   $data[] = $row;; 
}

print json_encode($data);
?>