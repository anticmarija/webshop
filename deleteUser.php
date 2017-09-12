<?php

require_once 'config.php';

global $dbc;

$data=json_decode(file_get_contents("php://input"));

$query = "DELETE FROM users where user_id = " .$data->user_id;

echo $query;
$stmt = $dbc->prepare($query);
 

$stmt->execute();
?>