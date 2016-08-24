var app = angular.module('fotballApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('leagues', {
        url: '/leagues',
        templateUrl: 'views/leagues.html',
        controller: 'MainController as Ctrl'
    });

    $stateProvider.state('teams', {
        url: '/teams',
        templateUrl: 'views/leagues.html',
        controller: 'MainController as Ctrl'
    });

});

app.controller('MainController', ['$http', '$scope', function($http, $scope) {

    $scope.nameText = "Hey!";
    $scope.leaguesLoaded = false;
    $scope.aLeagueIsSelected = false;

    $scope.getLeagues = function() {

        $http({
            method: 'GET',
            headers: {
                'Content-Type': 'text/json',
                'X-Auth-Token': '1d8e93dbf9104d589b510b458144851b'
            },
            url: 'http://api.football-data.org/v1/competitions/?season=2016'
        }).then(function successCallback(response) {
            $scope.competitions = response.data;
            $scope.leaguesLoaded = true;
        }, function errorCallback(response) {
        });

    };
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

    $scope.getLeagues();

}]);
