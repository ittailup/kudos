'use strict';

var app = angular.module('kudosApp');

app.factory('LinksService', ['$firebase', function($firebase){
    var ref = new Firebase('https://luminous-fire-6098.firebaseio.com/');
    return $firebase(ref);
}])

app.controller('LinksCtrl', ['$scope', 'LinksService',
    function ($scope, linksService) {

        $scope.rows = [
            {url: 'http://reddit.com', id: 1},
            {url: 'http://wevue.com', id: 2},
            {url: 'http://buzzfeed.com', id: 3}
        ];

        $scope.links = linksService;

        $scope.links.$child('Anonymous').$set($scope.rows);

        $scope.temp = false;
        $scope.activeEmail = '';


        $scope.addRow = function () {
            if ($scope.isActive) {
                $scope.links.$child($scope.activeEmail).$update($scope.rows);
            } else $scope.links.$child('Anonymous').$update($scope.rows);
            $scope.temp = false;
            $scope.addLink = 'http://www.';
        };

        $scope.deleteRow = function (row) {
            $scope.rows.splice($scope.rows.indexOf(row), 1);
        };

        $scope.isActive = function(){
            if ($scope.activeEmail) return true;
            else return false;
        };

        $scope.saveEmail = function(){

            $scope.activeEmail = $scope.addEmail.replace('@','---at---');
            $scope.activeEmail = $scope.activeEmail.replace('.','---dot---');
            $scope.links.$child($scope.activeEmail).$set($scope.rows);
            //$scope.links.$child(activeEmail).$set($scope.rows);
        };

        $scope.addTemp = function (){
            if ($scope.temp) $scope.rows.pop();
            else if ($scope.addLink) $scope.temp = true;

            if ($scope.addLink) $scope.rows.push({url: $scope.addLink, id: $scope.rows.length + 1});
            else $scope.temp = false;
        };

        $scope.insertLead = function (){
            $scope.addLink = 'http://www.';
        };

        $scope.isTemp = function (i) {
            return i === 0 && $scope.temp;
        };
    }
]);

