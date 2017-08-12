<?php
 
//connect to MySql database
try {
    $dbc=new PDO("mysql:host=localhost;dbname=webshop","root","") 
     or die("Unable to connect.");
}
catch(PDOException $e)
    {
      echo "Error: " . $e->getMessage();
    }
 
?>