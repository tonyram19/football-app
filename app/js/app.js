var app = angular.module('fotballApp', ['ui.router']);

app.service('FootballService', ['$http', '$q', function($http, $q) {

    myThis = this;

    this.setCurrentLeague = function(leagueID) {
        myThis.currentLeague = leagueID;
    };

    this.getCurrentLeague = function() {
        return myThis.currentLeague;
    };

}]);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('leagues', {
        url: '',
        templateUrl: 'views/leagues.html',
        controller: 'LeaguesController as Ctrl'
    });

    $stateProvider.state('teams', {
        url: '/teams',
        templateUrl: 'views/teams.html',
        controller: 'TeamsController as Ctrl'
    });

});

app.controller('LeaguesController', ['$http', '$scope', 'FootballService', function($http, $scope, FootballService) {

    $scope.setCurrentLeague = function(leagueID) {
            FootballService.setCurrentLeague(leagueID);
    };

    $scope.getLeagues = function() {
        $http({
            method: 'GET',
            headers: {
                'Content-Type': 'text/json',
                'X-Auth-Token': '1d8e93dbf9104d589b510b458144851b'
            },
            url: 'http://api.football-data.org/v1/competitions/?season=2016'
        }).then(function(response) {
            $scope.competitions = response.data;
        });
    };

    $scope.getLeagues();

}]);

app.controller('TeamsController', ['$http', '$scope', 'FootballService', function($http, $scope, FootballService) {

    $scope.getTeams = function(competitionID) {
        $http({
            method: 'GET',
            headers: {
                'Content-Type': 'text/json',
                'X-Auth-Token': '1d8e93dbf9104d589b510b458144851b'
            },
            url: 'http://api.football-data.org/v1/competitions/' + FootballService.getCurrentLeague() + '/teams'
        }).then(function (response) {
            $scope.teams = response.data.teams;
        });
    };

    $scope.getTeams();

}]);
