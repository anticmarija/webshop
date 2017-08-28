<?php

require_once 'config.php';

global $dbc;

$data=json_decode(file_get_contents("php://input"));

$query = "DELETE FROM wishlist_item where user_id = " .$data->user_id . " and product_id = ". $data->product_id;

echo $query;
$stmt = $dbc->prepare("DELETE FROM wishlist_item where user_id ='" .$data->user_id . "' and product_id =". $data->product_id);
 

$stmt->execute();
?>