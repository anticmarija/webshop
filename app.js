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
    app.controller('GetProducts', function($scope, $http){
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

    // var products = [
    // {product_id: "1", name: "Red Lips", price: "50", short_desc: "Enhance natural lip color beautifully!", long_desc: "Beautiful lipstick which is subtle enhancing natur…, fragrance free, allergen-free, and gluten free."},
    // {product_id: "2", name: "Nude lips", price: "55", short_desc: "A neutral, pale beige with a hint of pink!", long_desc: "beautiful lipstick which is subtle enhancing natur…, fragrance free, allergen-free, and gluten free."},
    // {product_id: "3", name: "Pink lipgloss", price: "75", short_desc: "Wrap your lips in high-impact metallic color!", long_desc: "Wrap your lips in high-impact metallic color! Thes…ree, gluten free, mica free, and fragrance free. "},
    // {product_id: "4", name: "Red Lip Pencil", price: "12", short_desc: "Works with warm, rich berry lipsticks.", long_desc: "Red Lip Pencil is a rich berry pink color. Incredi…yon will enhance lipsticks with berry undertones."},
    // {product_id: "5", name: "Neutral Lip Pencil", price: "10", short_desc: "Suitable for lipsticks with pink undertones.", long_desc: "Neutral Lip Pencil is a subtle, salmon pink color.…r smooth, this lip crayon will enhance lip color."},
    // {product_id: "6", name: "Eyeshadow Pallette - Large", price: "75", short_desc: "Highly pigmented and easy-to-blend formula!", long_desc: "Highly pigmented and easy-to-blend formula. The pa…ual-side soft bristle brush for easy application."},
    // {product_id: "7", name: "Eyeshadow Palette - Small", price: "35", short_desc: "An eyeshadow palette with highly pigmented mattes.", long_desc: "For maximum payoff, use your finger to apply the c…amy metals. Do not apply with an eyeshadow brush."},
    // {product_id: "8", name: "Liquid Eyeliner", price: "15", short_desc: "For dramatis eyes!", long_desc: "A liquid eyeliner with an innovative brush tip for effortless, precise application."},
    // {product_id: "9", name: "Super Curling Mascara", price: "20", short_desc: "It's a roller for lashes!", long_desc: "The eye - opening Hook 'n' Roll brush grabs, separ…stant curve - setting formula holds for 12 hours."},
    // {product_id: "10", name: "Brush Set", price: "100", short_desc: "When it comes to flawless application!", long_desc: "Buff, blend, line and define with our Makeup Brush Set. "},
    // {product_id: "11", name: "Light/Medium Foundation", price: "45", short_desc: "A new 24-Hour, full-coverage foundation!", long_desc: "Foundation that instantly blurs pores and fines li…s wear that looks and feels just applied, all-day"},
    // {product_id: "12", name: "Dark Foundation", price: "45", short_desc: "A lightweight liquid foundation!", long_desc: "A lightweight liquid foundation that achieves a radiant, silky finish. "},
    // {product_id: "13", name: "Translucent Concealer", price: "35", short_desc: "Ideal for all skin types!", long_desc: "An award-winning concealer that provides medium-to…and corrects, contours, highlights, and perfects."},
    // {product_id: "14", name: "Neutral Beige Powder", price: "70", short_desc: "A breakthrough multiuse formula", long_desc: "A breakthrough multiuse formula that can be applied as a foundation or setting powder."},
    // {product_id: "15", name: "Golden Beige Powder", price: "70", short_desc: "Silky powder with a touch of sheer coverage.", long_desc: " cult-favorite and award-winning, silky powder wit…of sheer coverage to set makeup for lasting wear."},
// ]

})();