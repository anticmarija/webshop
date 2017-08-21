<?php 
 
require_once 'config.php';

global $dbc;

$data=json_decode(file_get_contents("php://input"));

$stmt = $dbc->query('SELECT MAX(order_id) FROM orders');

$result = $stmt->fetch(PDO::FETCH_ASSOC);

foreach ($result as $key => $value) {
    $max = $value;
}

$query = "INSERT into orders (order_id, email,address, total) VALUES ( ".++$max.", '".$data->emailOrder."', '".$data->addressOrder."', ".$data->total.")";

$stmt2 = $dbc->prepare($query);
$stmt2->execute();


foreach ($data->cartProducts as $i => $value) {
    $query1 ="INSERT into order_item (product_id, order_id, quantity) VALUES (".$value->product_id.", ".$max.", ".$value->quantity.")";


    $stmt3 = $dbc->prepare($query1);

    $stmt3->execute();
}



?>