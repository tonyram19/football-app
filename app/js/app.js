var app = angular.module("fotballApp", []);

app.controller("MainController", ['$http', '$scope', function($http, $scope) {

    $scope.nameText = "Hey!";

    $http({
        method: 'GET',
        headers: {
            'Content-Type': 'text/json',
            'X-Auth-Token': '1d8e93dbf9104d589b510b458144851b'
        },
        url: 'http://api.football-data.org/v1/competitions/?season=2015'
    }).then(function successCallback(response) {
        $scope.competitions = response.data;
    }, function errorCallback(response) {
    });

}]);
