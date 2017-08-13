<?php
session_start();
 
if(isset($_SESSION['logged_in'])){
      header('Location: /webshop/loggedInView.html');
}

// if(isset($_GET['product'])) {
//     $product = $_GET['product'];  /* gets the variable $page */

// }
//      /* otherwise, include the default page */
?>

<!DOCTYPE html>
<html lang="en" ng-app="store">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="images/favicon.ico">

    <title>Make up webshop</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <link href="css/carousel.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">

  </head>
  <body ng-controller ="GetProducts as getPCtrl">

    <div ng-include="'navbar.html'"></div>
    
    <div ng-include="'carousel.html'"></div>

    <div ng-include="'loginModal.html'"></div>

    <div ng-include="'registerModal.html'"></div>

    <div ng-include="'navbarCategories.html'"></div>

             <div class= "container" id="products">
                    <div class="col-lg-4" ng-repeat="product in products | filter:filters | limitTo : 9" >
                      <img class="img-circle" src="" alt="" width="140" height="140">
                      <h2>{{product.name}}</h2>
                      <p>{{product.short_desc}}</p>
                      <em class="pull-right">{{product.price | currency}}</em>
                      <p><a class= "btn btn-default" role="button" style="background-color: #ff69b4;">View details &raquo;</a></p>

                </div>           
            </div>





    <div ng-include="'footer.html'"></div>
  
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/jquery.min.js"><\/script>')</script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/holder.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.5/angular.min.js"></script>
    <script src="app.js"></script>


    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js"></script>


  </body>
</html>
