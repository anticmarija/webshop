<?php
session_start();
 
if(isset($_SESSION['logged_in'])){

}
?>


<!DOCTYPE html>
<html lang="en" ng-app="store">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
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
<!-- NAVBAR
================================================== -->
  <body>
    <div class="navbar-wrapper">
      <div class="container">

        <nav class="navbar navbar-inverse navbar-static-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">MAKEUP WEBSHOP</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Cart</a></li>
                
                <li class="pull-right"><a data-toggle="modal" data-target="#myModal">Log In/Register</a></li>

              </ul>
            </div>
          </div>
        </nav>

      </div>
    </div>

    <div class="container">
       <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>

     <!-- Wrapper for slides -->
    <div class="carousel-inner">
      <div class="item active">
        <img src="images/slide1.jpg" alt="Los Angeles" style="width:100%;">
        <div class="carousel-caption"><a href="#products" class="btn-store outline">Let's shop</a></div>

      </div>

      <div class="item">
        <img src="images/slide2.jpg" alt="Chicago" style="width:100%;">
        <div class="carousel-caption"><a href="#products" class="btn-store outline">Let's shop</a></div>

      </div>
    
      <div class="item">
        <img src="images/slide3.jpg" alt="New york" style="width:100%;"/>
        <div class="carousel-caption"><a href="#products" class="btn-store outline">Let's shop</a></div>
      </div>
    </div>


    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <i class="fa fa-chevron-left" style="margin-top: 150%"aria-hidden="true"></i>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
      <!-- <span class="glyphicon glyphicon-chevron-right strelica"></span> -->
      <i class="fa fa-chevron-right" style="margin-top: 150%" aria-hidden="true"></i>

      <span class="sr-only">Next</span>
    </a>
   </div>

    </div>
    <div class="container marketing" id="products">


<!-- Login modal
 --><div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="submit" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Log in</h4>
      </div>
      <div class="modal-body">
        <form action="userLogin.php" method="post">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" name="email" required>
          </div>
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" name="password" required>
          </div>

          <div class="alert alert-danger" ng-show="errorMsg">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                        </button>
                        <span>{{errorMsg}}</span>
                     </div>
          <p>If you don't have an account, <a data-toggle="modal" data-target="#myModalReg" data-dismiss="modal">register</a></p>
           <div class="modal-footer">
             <button type="submit" class="btn btn-primary">Login</button>
          </div>
          </form>
      </div>
     

    
    </div>

  </div>
</div>

<!-- Register modal
 --><div id="myModalReg" class="modal fade" role="dialog" ng-controller="RegisterUserController as regUserCtrl">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="submit" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Register</h4>
      </div>
      <div class="modal-body">
        <form ng-submit="regUserCtrl.register()">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" ng-model="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" ng-model="password" name="password" required>
          </div>
          <div class="form-group">
            <label for="pwd">Renter password:</label>
            <input type="password" class="form-control" ng-model="passwordAgain" name="passwordAgain" required>
          </div>
          {{regUserCtrl.success}}
          <div class="alert alert-danger" ng-show="errorMsg">
              <span>{{errorMsg}}</span>
          </div>
          <div class="alert alert-success" ng-show="successMsg">
                      
                        <span>{{successMsg}}</span>
          </div>
           <div class="modal-footer">
             <button type="submit" class="btn btn-primary">Register</button>
          </div>
          </form>
      </div>
     

    
    </div>

  </div>
</div>


      <!-- Three columns of text below the carousel -->
      <div class="row">
        <div class="col-lg-4">
          <img class="img-circle" src="" alt="Generic placeholder image" width="140" height="140">
          <h2>Heading</h2>
          <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
          <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div><!-- /.col-lg-4 -->
        <div class="col-lg-4">
          <img class="img-circle" src="" alt="Generic placeholder image" width="140" height="140">
          <h2>Heading</h2>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
          <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div><!-- /.col-lg-4 -->
        <div class="col-lg-4">
          <img class="img-circle" src="" alt="Generic placeholder image" width="140" height="140">
          <h2>Heading</h2>
          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
          <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div><!-- /.col-lg-4 -->
      </div><!-- /.row -->

      <!-- FOOTER -->
      <footer>
        <p class="pull-right"><a href="#">Back to top</a></p>
        <p>&copy; 2016 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>

    </div><!-- /.container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/jquery.min.js"><\/script>')</script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/holder.min.js"></script>

<!--     Angular ui router
 -->  
     <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.5/angular.min.js"></script>
     <script src="app.js"></script>


    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js"></script>


  </body>
</html>