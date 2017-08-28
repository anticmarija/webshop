<?php 
 
require_once 'config.php';

global $dbc;

$data=json_decode(file_get_contents("php://input"));

echo "INSERT into wishlist_item (product_id,user_id) VALUES ( '".$data->product_id."', '".$data->user_id."')";

$stmt = $dbc->prepare("INSERT into wishlist_item (product_id,user_id) VALUES ( '".$data->product_id."', '".$data->user_id."')");

$stmt->execute();

 
?>