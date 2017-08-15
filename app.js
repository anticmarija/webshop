(function() {

    var app = angular.module('store', []);

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

    

        app.controller('LoginUser', function($scope, $http) {
            this.login = function() {
                console.log($scope.email1);
            var data1 = {'email':$scope.email1, 'password':$scope.password1};           
               $http({
                    method: 'POST',
                    url: 'userLogin.php',
                    data: data1,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(success) {
                    console.log(success.data);

                }, function(error){
                    $scope.errorMsg ="Oooops... login failed!";
                }); 
            }

        });
 
        app.controller('StoreController', function($scope, $http){
        // this.products = products;
        $scope.products=[];
            $http.get("getProducts.php")
            .then(function(data){
                $scope.products= data['data'];
                console.log($scope.products);
                }, function(error){
                $scope.errorMsg ="We have troubles with connection!";
            });

        $scope.filters = { };


        $scope.show = false;
        
    });

        app.controller("PanelController", function() {
        this.tab = 1;

        this.selectTab = function(setTab) {
            this.tab = setTab;
        };

        this.isSelected = function(checkTab) {
            return this.tab === checkTab;
        };
    });

    app.controller("ReviewController", function() {
        this.review={};

        this.addReview = function(product) {
            product.reviews.push(this.review);
            this.review ={};
        }
    });

 
    // app.controller('LoginUser', function($scope, $http){
    //         $scope.user=[];
    //         var data = {'email':$scope.email, 'password':$scope.password};           

    //           $http({
    //                 method: 'GET',
    //                 url: 'userLogin.php',
    //                 data: data,
    //                 headers: {'Content-Type': 'application/json'}
    //             }).then(function(success) {
    //                 $scope.user = success['data'];
    //                 console.log($scope.user);
    //             }, function(error){
    //                 $scope.errorMsg ="Oooops... Registration failed!";
    //             }); 
    //         });


})();