<?php
require_once 'config.php';

global $dbc;


if(!empty($_FILES)) {

    var_dump($_FILES);
    $path='images/' .$_FILES['file']['name'];


    if(move_uploaded_file($_FILES['file']['tmp_name'], $path)) {
            $query = "INSERT INTO products (image) VALUES ('".$path."') ";
            echo $query;
            $stmt = $dbc->prepare($query);
            $stmt->execute();

        }
} else {
    echo "Empty files!";
}

?>
