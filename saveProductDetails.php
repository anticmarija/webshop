<?php 
 
require_once 'config.php';

global $dbc;

$data=json_decode(file_get_contents("php://input"));

$stmt = $dbc->query('SELECT MAX(product_id) FROM products');

$result = $stmt->fetch(PDO::FETCH_ASSOC);

foreach ($result as $key => $value) {
    $max = $value;
}

 $query = "UPDATE products SET name ='".$data->name."',price = ".$data->price.",short_desc='".$data->short_desc."', long_desc ='".$data->long_desc."' , sale = '".$data->on_sale."', salePrice= ".$data->salePrice.", subcategory_id =".$data->subcat." WHERE (product_id = " .$max.')';

echo $query;
$stmt2 = $dbc->prepare($query);
$stmt2->execute();
 ?>