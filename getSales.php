<?php

require_once 'config.php';

global $dbc;


$query = 'SELECT products.name, sum(order_item.quantity) as sales FROM order_item LEFT JOIN products ON products.product_id = order_item.product_id GROUP BY products.product_id';

$stmt = $dbc->query($query);
 
$data = [];
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
   $data[] = $row;
}
$imena =[]; $prodaja=[];
foreach ($data as $proizvod) {
    $imena[] = $proizvod['name'];
    $prodaja[] =$proizvod['sales'];
}

$rezultat['imena'] =$imena;
$rezultat['prodaja'] = $prodaja;

print json_encode($rezultat);

?>