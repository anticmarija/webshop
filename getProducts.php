<?php

require_once 'config.php';

global $dbc;

$stmt = $dbc->query('SELECT * FROM products AS p LEFT OUTER JOIN reviews AS r ON (p.product_id = r.product_id) order by p.product_id');
 
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
   $data[] = $row;
}

for($i = 0; $i<sizeof($data)-1; $i++) {
  $review = [];
    for ($j=0; $j <sizeof($data)-1 ; $j++) { 
        if($data[$i]['product_id'] === $data[$j]['product_id'] && $data[$i]['product_id'] !==null){

            $review['stars'] = $data[$j]['stars'];
            $review['body'] = $data[$j]['body'];
            $review['author'] = $data[$j]['author'];
            $data[$i]['reviews'][] =$review;

    }

}  
}

$niz=[];

for ($i=0; $i <sizeof($data) ; $i++) { 

    $niz[] = $data[$i];

    for ($j=$i+1; $j < sizeof($data); $j++) { 

        if($data[$i]['product_id'] === $data[$j]['product_id'] && $data[$i]['name'] === $data[$j]['name']) {
        } else {
            $niz[] = $data[$j];
            $i = $j;
            break;
        }
    }
}

 print json_encode($niz);
?>