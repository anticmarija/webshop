<?php

require_once 'config.php';

global $dbc;

$stmt = $dbc->query('SELECT * FROM products AS p LEFT JOIN reviews AS r ON (r.product_id = p.product_id) order by p.product_id');
 
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
   $data[] = $row;
}


for($i = 0; $i<sizeof($data)-1; $i++) {
  $review = [];
    for ($j=0; $j <sizeof($data)-1 ; $j++) { 
        if($data[$i]['product_id'] === $data[$j]['product_id'] ){

            $review['stars'] = $data[$j]['stars'];
            $review['body'] = $data[$j]['body'];
            $review['author'] = $data[$j]['author'];
            $data[$i]['reviews'][] =$review;

    }

}  
}


for($i=0; $i<=sizeof($data)-2; $i++) {
    if($data[$i]['product_id'] === $data[$i+1]['product_id']){

        if($i==sizeof($data)-2) {
             $data[sizeof($data)-2] = $data[sizeof($data)-1];
             unset($data[sizeof($data)-1]);
             continue;
        }
         $data[$i+1] = $data[$i+2];
        
        }
    }

print json_encode($data);
?>