<?php

require_once 'config.php';

global $dbc;

$stmt = $dbc->query('SELECT * FROM subcategory');
 
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
   $data[] = $row;
}

print json_encode($data);
?>