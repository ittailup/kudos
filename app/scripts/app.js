'use strict';

angular
  .module('kudosApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'LinksCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
