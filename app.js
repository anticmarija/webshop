(function() {

    var app = angular.module('store', ['ngCookies', 'ngRoute']);

    // app.config(['$routeProvider', function($routeProvider) {

    //     $routeProvider.
    //     when('/shop', {
    //         templateUrl: 'index.html'
    //     }).
    //     when('/cart', {
    //         templateUrl: 'cart.html'
    //     }).
    //      when('/dashboard', {
    //         templateUrl: 'dashboard.html'
    //     }).
    //     otherwise({
    //         redirectTo: 'shop'
    //     });
    // }]);


    app.controller('RegisterUserController', function($scope, $http) {
         this.register = function(){
            if($scope.password !== $scope.passwordAgain) {
                $scope.errorMsg = "Password don't match!";
            }

            else {
                $scope.errorMsg ="";
            var data = {'email':$scope.email, 'password':$scope.password};
             $http({
                    method: 'POST',
                    url: 'registerUser.php',
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(success) {
                    $scope.successMsg = "You've been successfully registered!";
                }, function(error){
                    $scope.errorMsg ="Oooops... Registration failed!";
                }); 
            }
           
         }

         });

        app.controller('LoginUser', function($scope, $http, $rootScope, $cookieStore) {
            this.login = function() {
            var data1 = {'email':$scope.email1, 'password':$scope.password1}; 
          
               $http({
                    method: 'POST',
                    url: 'userLogin.php',
                    data: data1,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(success) {
                    $rootScope.user = success.data[0];
                    console.log($rootScope.user.isAdmin);
                    $cookieStore.put('user', $rootScope.user);
                    console.log($cookieStore.get('user'));


                    if ($rootScope.user.isAdmin ==1){
                    }
                }, function(error){
                    $scope.errorMsg ="Oooops... login failed!";
                }); 
            }

        });
 
        app.controller('StoreController', ['$scope', '$http', '$cookieStore', '$rootScope', function($scope, $http, $cookieStore, $rootScope){
        // this.products = products

        $scope.products=[];
        $scope.wishlistProducts=[];


        $rootScope.user = null;
        if($cookieStore.get('user') != null ) {
            $rootScope.user = $cookieStore.get('user');
            //ovde povuci wishlist
            var data = {'user_id': $rootScope.user.user_id}
            $http({
                    method: 'POST',
                    url: 'getWishlist.php',
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(success) {
                    if(success.data == "empty") {

                    }else {
                     $scope.wishlistProducts = success.data;
                   }
                }, function(error){
                    console.log("nije povukao wishlist");
                }); 
        }

        $http.get("getProducts.php")
            .then(function(data){
                $scope.products= data['data'];
                console.log($scope.products);
                }, function(error){
                $scope.errorMsg ="We have troubles with connection!";
            });

        $scope.filters = { };

        $scope.unset = function(){
            $scope.filters={};
        }
        $scope.show = false;

        // $scope.cartProducts =[];
        $scope.getTotal = 0;
        $scope.quantity = 1;
        $scope.cartProducts = [];

        if ($cookieStore.get('cart') != null) {
            $scope.cartProducts =  $cookieStore.get('cart');
            console.log($scope.cartProducts);
            for(var i = 0; i < $scope.cartProducts.length; i++){
                var cartProduct = $scope.cartProducts[i];
                $scope.getTotal += (cartProduct.price * cartProduct.quantity);
            }
        } 
        
        this.addCartProduct = function(product) {
            var err="";
            if($scope.cartProducts.length > 0) {
                for(var i = 0; i < $scope.cartProducts.length; i++){
                    var cartProduct = $scope.cartProducts[i];
                    if(cartProduct.name === product.name) {
                       err="ima ga vec";
                       break;
                    }
                }
            }  
            if(err==="") {
                product['quantity'] = 1;
                $scope.cartProducts.push(product);
                $cookieStore.put('cart', $scope.cartProducts);
            }else {
                console.log(err);
            }
            

            
        }

        this.addWishlistProduct = function(product) {
             var err="";
            if($scope.wishlistProducts.length > 0) {
                for(var i = 0; i < $scope.wishlistProducts.length; i++){
                    var wishProduct = $scope.wishlistProducts[i];
                    if(wishProduct.name === product.name) {
                       err="ima ga vec";
                       break;
                    }
                }
            }  
            if(err==="") {
                $scope.wishlistProducts.push(product);
                var data = {'product_id': product.product_id, 'user_id':$rootScope.user.user_id};
                console.log(data);
                 $http({
                    method: 'POST',
                    url: 'saveWishlistItem.php',
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(success) {
                   console.log("otislo");
                }, function(error){
                    console.log("faiiil");
                }); 

            }else {
                console.log(err);
            }

        }

        this.removeItem = function(index) {
            $scope.cartProducts.splice(index, 1);
             console.log(index);
             $cookieStore.put('cart', $scope.cartProducts);
        }

        this.removeFromWishlist = function(index, product_id) {
            $scope.wishlistProducts.splice(index, 1);
            var data ={'product_id' : product_id, 'user_id' : $rootScope.user.user_id};
            console.log(data);
            $http({
                    method: 'POST',
                    url: 'deleteWishlistItem.php',
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(success) {
                   console.log("otislo za deleete");
                }, function(error){
                    console.log("delete puko");
                }); 
            console.log($scope.wishlistProducts);
        }

        $scope.checkout= false;

        this.calculateOrder = function() {
            $scope.checkout= true;
            var total = 0;
            for(var i = 0; i < $scope.cartProducts.length; i++){
                var cartProduct = $scope.cartProducts[i];
                total += (cartProduct.price * cartProduct.quantity);
            }
           $scope.calculateOrder = total;
        }

        this.saveOrder = function() {

            var data1 = {'emailOrder':$scope.emailOrder, 
                        'addressOrder':$scope.addressOrder, 
                        'total' :$scope.calculateOrder,
                        'cartProducts' : $scope.cartProducts
                        }; 

               $http({
                    method: 'POST',
                    url: 'saveOrder.php',
                    data: data1,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(success) {
                   $scope.successMsg = "Details about your order have been sent to your email!";
                }, function(error){
                    $scope.errorMsg ="Oooops... we had troubles with saving your order...";
                }); 
            }
        
        
    }]);

        app.controller("PanelController", function() {
        this.tab = 1;

        this.selectTab = function(setTab) {
            this.tab = setTab;
        };

        this.isSelected = function(checkTab) {
            return this.tab === checkTab;
        };
    });

    app.controller("ReviewController", function($http) {
        this.review={};

        this.addReview = function(product) {
            // product.reviews.push(this.review);
            var data = this.review;
            data['product_id'] = product.product_id;
            console.log(data);
            $http({
                    method: 'POST',
                    url: 'saveReview.php',
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(success) {
                    console.log("good");
                }, function(error){
                    console.log("error");
                }); 
            
        }
    });

})();