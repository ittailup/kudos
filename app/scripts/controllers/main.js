'use strict';

var app = angular.module('kudosApp');

app.factory('LinksService', ['$firebase', function($firebase){
    var ref = new Firebase("https://luminous-fire-6098.firebaseio.com/");
    return $firebase(ref);
}])

app.controller('LinksCtrl', ['$scope', 'LinksService',
    function ($scope, linksService) {

        $scope.rows = [
            {url: 'http://reddit.com', id: 1},
            {url: 'http://wevue.com', id: 2},
            {url: 'http://buzzfeed.com', id: 3}
        ];

        $scope.addLink = 'http://www.';
        $scope.messages = linksService;
        $scope.messages.$add($scope.rows);

        $scope.temp = false;

        $scope.addRow = function () {
            $scope.temp = false;
            $scope.addLink = 'http://www.';
        };

        $scope.deleteRow = function (row) {
            $scope.rows.splice($scope.rows.indexOf(row), 1);
        };

        $scope.addTemp = function () {
            if ($scope.temp) $scope.rows.pop();
            else if ($scope.addLink) $scope.temp = true;

            if ($scope.addLink) $scope.rows.push({url: $scope.addLink, id: $scope.rows.length + 1});
            else $scope.temp = false;
        };

        $scope.isTemp = function (i) {
            return i === 0 && $scope.temp;
        };
    }
]);

