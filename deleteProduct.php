<?php

require_once 'config.php';

global $dbc;

$data=json_decode(file_get_contents("php://input"));

$query = "DELETE FROM products where product_id = " .$data->product_id;

echo $query;
$stmt = $dbc->prepare($query);
 

$stmt->execute();
?>