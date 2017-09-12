<?php

require_once 'config.php';

global $dbc;
$inputData=json_decode(file_get_contents("php://input"));

$stmt = $dbc->query('SELECT * FROM orders as o RIGHT JOIN order_item AS oi ON (o.order_id = oi.order_id) JOIN products as p ON (oi.product_id = p.product_id) WHERE o.user_id =1');
 
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
   $data[] = $row;
}

for($i = 0; $i<sizeof($data)-1; $i++) {
  $review = [];
    for ($j=0; $j <sizeof($data) ; $j++) { 
        if($data[$i]['order_id'] === $data[$j]['order_id']){

            $order_item['product_id'] = $data[$j]['product_id'];
            $order_item['name'] = $data[$j]['name'];
            $order_item['quantity'] = $data[$j]['quantity'];
            $order_item['image'] = $data[$j]['image'];
            $order_item['price'] = $data[$j]['price'];
           

            $data[$i]['order_items'][] =$order_item;

    }

}  
}

$niz=[];

for ($i=0; $i <sizeof($data) ; $i++) { 

    $niz[] = $data[$i];

    for ($j=$i+1; $j < sizeof($data); $j++) { 

        if($data[$i]['order_id'] === $data[$j]['order_id']) {
        } else {
            $niz[] = $data[$j];
            $i = $j;
            break;
        }
    }
}

print json_encode($niz);
?>