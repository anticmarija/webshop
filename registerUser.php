<?php 
 
require_once 'config.php';

global $dbc;

$data=json_decode(file_get_contents("php://input"));

if($data->isAdmin !=null) {
    $query = "INSERT into users (email,password) VALUES ( '".$data->email."', '".$data->password."', '".$data->isAdmin."')";
}else {
    $query = "INSERT into users (email,password) VALUES ( '".$data->email."', '".$data->password."')";
}

$stmt = $dbc->prepare($query);

$stmt->execute();

 
?>