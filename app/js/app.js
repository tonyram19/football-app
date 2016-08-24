var app = angular.module("fotballApp", []);

app.controller("MainController", ['$http', '$scope', function($http, $scope) {

    $scope.nameText = "Hey!";
    $scope.aLeagueIsSelected = false;

    $http({
        method: 'GET',
        headers: {
            'Content-Type': 'text/json',
            'X-Auth-Token': '1d8e93dbf9104d589b510b458144851b'
        },
        url: 'http://api.football-data.org/v1/competitions/?season=2016'
    }).then(function successCallback(response) {
        $scope.competitions = response.data;
    }, function errorCallback(response) {
    });

    $scope.getTeams = function(competitionID) {

        $http({
            method: 'GET',
            headers: {
                'Content-Type': 'text/json',
                'X-Auth-Token': '1d8e93dbf9104d589b510b458144851b'
            },
            url: 'http://api.football-data.org/v1/competitions/' + competitionID + '/teams'
        }).then(function successCallback(response) {
            $scope.teams = response.data.teams;
            $scope.aLeagueIsSelected = true;
            console.log($scope.teams[0]);
        }, function errorCallback(response) {
        });

    };

}]);
