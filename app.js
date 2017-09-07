(function() {

    var app = angular.module('store', ['ngCookies', 'ngRoute']);

    app.controller('RegisterUserController', function($scope, $http) {

        $scope.adminOptions = [{name:"Regular user", value:0}, {name:"Admin user", value:1}];
         this.register = function(){
            if($scope.password !== $scope.passwordAgain) {
                $scope.errorMsg = "Password don't match!";
            }

            else {
                $scope.errorMsg ="";


                if($scope.isAdmin === "") {
                    var data = {'email':$scope.email, 'password':$scope.password, 'isAdmin':null};
                }else {
                    if($scope.isAdmin==="Regular user") {
                        var data = {'email':$scope.email, 'password':$scope.password, 'isAdmin':0};
                    }
                    if($scope.isAdmin==="Admin user") {
                        var data = {'email':$scope.email, 'password':$scope.password, 'isAdmin':1};
                    }

                }

                 $http({
                        method: 'POST',
                        url: 'registerUser.php',
                        data: data,
                        headers: {'Content-Type': 'application/json'}
                    }).then(function(success) {
                        $scope.successMsg = "Successfully registered!";
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
                    if(success.data[0] != null) {
                    $rootScope.user = success.data[0];
                    $cookieStore.put('user', $rootScope.user);
                    $scope.userEmail = $rootScope.user.email;
                    $scope.successLogin= "You've been successfully logged in!";
                    console.log($scope.successLogin);
                }else {
                   $scope.errorLogin ="Oooops... login failed!";

                }
                }, function(error){
                    $scope.errorLogin ="Oooops... login failed!";
                }); 
            }

            this.logout = function() {
                console.log("uslo");
                $rootScope.user = null;
                $cookieStore.remove('user');
                $cookieStore.remove('cart');
                $scope.successLogin= "";

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

             $http({
                    method: 'POST',
                    url: 'getAllOrders.php',
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(success) {
                    $scope.orderedProducts = success.data;
                    console.log($scope.orderedProducts);
                }, function(error){
                    console.log("nije povukao orders");
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
                $scope.addedToCart="Added to cart!";
            }else {
                console.log(err);
            }
            
        }
        $scope.addedToCart = false;
        $scope.addedToWishlist = "";


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

        this.emptyCart = function() {
            $scope.cartProducts = [];
            $cookieStore.put('cart', $scope.cartProducts);
            console.log($scope.cartProducts);

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

        
        this.saveOrder = function(emailOrder, addressOrder) {
            $scope.emailOrder=emailOrder;
            $scope.addressOrder=addressOrder;

            var data1 = {'emailOrder':$scope.emailOrder, 
                        'addressOrder':$scope.addressOrder, 
                        'total' :$scope.calculateOrder,
                        'cartProducts' : $scope.cartProducts
                        }; 

            if($rootScope.user) {
                data1['user'] = $rootScope.user;
            } else {
             data1['user'] = null;

            }
            console.log(data1);

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

            $scope.addProduct= false;

            this.showProductForm = function() {
                $scope.saleOptions = [{name: "YES", value:1}, {name:"NO", value:0}];
                $scope.addProduct= true;
                $http({
                    method: 'GET',
                    url: 'getAllSubcategories.php',
                }).then(function(success) {
                   $scope.subcategories = success.data;
                }, function(error){
                    console.log("greska kod ucitavanja combo-a.");
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
                    $scope.errorReview = "Oooops... Review is not saved!";
              }); 
            
        }
    });

    app.controller("UploadProductController", function($scope, $http){
        $scope.uploadFile = function() {
            var form_data = new FormData();

            if($scope.productOnSale==="YES") {
                var onSale=1;
            }else {
              var onSale=0;
            }

           for(var i= 0; i <$scope.subcategories.length; i++) {
                if($scope.productSubcat === $scope.subcategories[i].subcategory_name) {
                    var idSubcat = $scope.subcategories[i].subcategory_id;
                }
            }
           

            var data = {
                name: $scope.productName,
                price: $scope.productPrice,
                short_desc: $scope.productShortDesc,
                long_desc: $scope.productLongDesc,
                on_sale: onSale,
                salePrice: $scope.productSalePrice,
                subcat: idSubcat
            }

            console.log(data);

            angular.forEach($scope.files,function(file){
                form_data.append('file', file);
            });

            angular.forEach(data,function(key){
                form_data.append('data', key);
            });


                 
                       
            $http.post('saveProduct.php', form_data,
            {
                transformRequest:angular.identity,
                headers: {'Content-Type': undefined, 'Process-Data':false}
            }
                ).then(function(success) {
                    $scope.successAddProduct = "Product is saved!";
                   $http({
                    method: 'POST',
                    url: 'saveProductDetails.php',
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(success) {
                 
                }, function(error){
                    $scope.errorAddProduct= "Oooops... Product is not saved!";
              }); 
                }, function(error) {

                });
        }
    });


    app.directive("fileInput", function($parse) {
        return {
            link: function($scope, element, attrs) {
                element.on("change", function(event){
                    var files = event.target.files;
                    console.log(files[0].name);

                   $scope.files = files;

                });
            }
        }
    });



})();