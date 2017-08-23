<?php 
session_start();
require_once 'config.php';

global $dbc;


$data=json_decode(file_get_contents("php://input"));



$stmt = $dbc->prepare("SELECT * from users WHERE email ='".$data->email."' && password='".$data->password."'");

$stmt->execute();
$podaci=[];

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
   $podaci[] = $row;
}

print json_encode($podaci);

?>