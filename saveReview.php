<?php 
 
require_once 'config.php';

global $dbc;

$data=json_decode(file_get_contents("php://input"));

$stmt = $dbc->prepare("INSERT into reviews (stars,body,author, product_id) VALUES ( ".$data->stars.", '".$data->body."', '".$data->author."', ".$data->product_id.")");

$stmt->execute();

 
?>