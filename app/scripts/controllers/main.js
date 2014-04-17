'use strict';

var app = angular.module('kudosApp');

app.factory('LinksService', ['$firebase', function($firebase){
    var ref = new Firebase('https://luminous-fire-6098.firebaseio.com/');
    return $firebase(ref);
}])

app.controller('LinksCtrl', ['$scope', '$http', 'LinksService',
    function ($scope, $http, linksService) {

        $scope.rows = [
            {url: 'http://reddit.com', id: 1},
            {url: 'http://wevue.com', id: 2},
            {url: 'http://what.com', id: 3}
        ];

        $scope.links = linksService;
        $scope.activeEmail = 'Anonymous'
        $scope.links.$child($scope.activeEmail).$set($scope.rows);

        $scope.temp = false;


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
            if ($scope.activeEmail != 'Anonymous') return true;
            else return false;
        };

        $scope.sendEmail = function(){
            var textlinksArr = ["Hi there, you submitted a few links to us earlier today, here's all ", String($scope.rows.length), ' of them:\n'];

            for (var i = 0; i<$scope.rows.length;i++) {
                textlinksArr.push([i+1, '. ', $scope.rows[i].url, '\n'].join('')); // 1. http://google.com
            };

            textlinksArr.push("\nThat's all you wrote in the app!",
                               "\nIf you lost some data please ask me.",
                               "\n\nBest,\nGabriel");

            var emailtext =  textlinksArr.join('');

            var emailObj = {
                        'key':'faYHzgdKdObZtFeDxupzqA',
                        'message': {
                            'subject': "Bob, we've got some links of yours in here.",
                            'text': emailtext,
                            'from_email':"gabriel@predius.org",
                            'to': [
                                {
                                    "email": $scope.activeEmail,
                                    "type": "to"
                                }
                            ]
                        }

            };
            $http.post('https://mandrillapp.com/api/1.0/messages/send.json', emailObj);

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

