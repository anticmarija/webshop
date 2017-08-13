<?php 

require_once 'config.php';

global $dbc;

$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $dbc->prepare("SELECT email,password from users WHERE 
email='".$email."' && password='".  $password."'");

$stmt->execute();

$row = $stmt->rowCount();

if ($row > 0){    

    $_SESSION['logged_in'] = true;


} else{ 
    echo 'wrong';
}

?>