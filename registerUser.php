<?php 
 
require_once 'config.php';

global $dbc;

$data=json_decode(file_get_contents("php://input"));

$stmt = $dbc->prepare("INSERT into users (email,password) VALUES ( '".$data->email."', '".$data->password."')");

$stmt->execute();

 
?>