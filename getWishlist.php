<?php

require_once 'config.php';

global $dbc;

$data=json_decode(file_get_contents("php://input"));

$stmt = $dbc->query('SELECT * FROM `wishlist_item` as w left join products as p on (w.product_id = p.product_id) where w.user_id ='.$data->user_id);
 
 $wishlist = [];
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
   $wishlist[] = $row;
}

if(sizeof($wishlist) == 0) {
    print "empty";
}
else {
 print json_encode($wishlist);
}


?>