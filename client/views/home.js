app.controller("HomeCtrl", ['$scope', '$rootScope', '$filter', '$http', function ($scope, $rootScope, $filter, $http) {

    $scope.welcomeMessage = "Welcome to home automation";   

    $scope.Update=function(bulbOn){
        $http.post('/post', { bool: bulbOn }).then(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    }

    
}]);
