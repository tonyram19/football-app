var app = angular.module('fotballApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('leagues', {
        url: '',
        templateUrl: 'views/leagues.html',
        controller: 'LeaguesController as Ctrl'
    });

    $stateProvider.state('teams', {
        url: '/table',
        templateUrl: 'views/league-table.html',
        controller: 'TableController as Ctrl'
    });

});

app.service('FootballService', ['$http', '$q', function($http, $q) {

    myThis = this;

    this.setCurrentLeague = function(leagueID) {
        myThis.currentLeague = leagueID;
    };

    this.getCurrentLeague = function() {
        return myThis.currentLeague;
    };

}]);


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

app.controller('TableController', ['$http', '$scope', 'FootballService', function($http, $scope, FootballService) {

    $scope.getTeams = function(competitionID) {
        $http({
            method: 'GET',
            headers: {
                'Content-Type': 'text/json',
                'X-Auth-Token': '1d8e93dbf9104d589b510b458144851b'
            },
            url: 'http://api.football-data.org/v1/competitions/' + FootballService.getCurrentLeague() + '/leagueTable'
        }).then(function (response) {
            $scope.teams = response.data.standing;
            console.log(response.data.standing);
        });
    };

    $scope.getTeams();

}]);
