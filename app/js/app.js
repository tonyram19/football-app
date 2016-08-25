var app = angular.module('fotballApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('leagues', {
        url: '',
        templateUrl: 'views/leagues.html',
        controller: 'LeaguesController as Ctrl'
    });

    $stateProvider.state('table', {
        url: '/table',
        templateUrl: 'views/league-table.html',
        controller: 'TableController as Ctrl'
    });

    $stateProvider.state('team', {
        url: '/team',
        templateUrl: 'views/team.html',
        controller: 'TeamController as Ctrl'
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

    this.setCurrentTeam = function(teamLink) {
        myThis.currentTeam = teamLink;
    };

    this.getCurrentTeam = function() {
        return myThis.currentTeam;
    };

}]);


app.controller('LeaguesController', ['$http', '$scope', 'FootballService', function($http, $scope, FootballService) {

    $scope.leaguesLoaded = false;

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
            url: 'https://api.football-data.org/v1/competitions/?season=2016'
        }).then(function(response) {
            $scope.competitions = response.data;
            $scope.leaguesLoaded = true;
        });
    };

    $scope.getLeagues();

}]);

app.controller('TableController', ['$http', '$scope', 'FootballService', function($http, $scope, FootballService) {

    $scope.tableLoaded = false;

    $scope.setCurrentTeam = function(teamLink) {
        FootballService.setCurrentTeam(teamLink);
    };

    $scope.getTable = function(competitionID) {
        $http({
            method: 'GET',
            headers: {
                'Content-Type': 'text/json',
                'X-Auth-Token': '1d8e93dbf9104d589b510b458144851b'
            },
            url: 'https://api.football-data.org/v1/competitions/' + FootballService.getCurrentLeague() + '/leagueTable'
        }).then(function (response) {
            $scope.table = response.data;
            $scope.tableLoaded = true;
        });
    };

    $scope.getTable();

}]);

app.controller('TeamController', ['$http', '$scope', 'FootballService', function($http, $scope, FootballService) {

    $scope.teamLoaded = false;

    $scope.getTeam = function(teamID) {
        $http({
            method: 'GET',
            headers: {
                'Content-Type': 'text/json',
                'X-Auth-Token': '1d8e93dbf9104d589b510b458144851b'
            },
            url: FootballService.getCurrentTeam()
        }).then(function (response) {
            $scope.team = response.data;
            $scope.teamLoaded = true;
            console.log($scope.team);
        });
    };

    $scope.getTeam();

}]);
