'use strict';

angular.module('realEmoWebserviceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/:userID',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
