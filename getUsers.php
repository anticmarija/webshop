<?php

require_once 'config.php';

global $dbc;


$query = 'SELECT * FROM users';

$stmt = $dbc->query($query);
 
$data = [];
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
   $data[] = $row;
}

print json_encode($data);



?>