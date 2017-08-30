<?php

require_once 'config.php';

global $dbc;

$user = json_decode(file_get_contents("php://input"));

$query = 'SELECT * FROM `order_item` as oi left join orders as o on (oi.order_id = o.order_id) where user_id ='.$user->user_id;

$stmt = $dbc->query('SELECT * FROM `order_item` as oi left join orders as o on (oi.order_id = o.order_id) left join products as p on (p.product_id = oi.product_id) where user_id ='.$user->user_id);
 
$data = [];
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
   $data[] = $row;
}

print json_encode($data);



?>