<?php 
session_start();
require_once 'config.php';

global $dbc;


// $data=json_encode(file_get_contents("php://input"));

$email =$_POST['email1'];
$password= $_POST['password1'];

$stmt = $dbc->prepare("SELECT email,password from users WHERE email ='".$email."' && password='".$password."'");

$stmt->execute();
$podaci=[];

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
   $podaci[] = $row;
}

if(sizeof($podaci) > 0) {
    $_SESSION['user'] = $email;
    header('Location: index.php');
}

?>