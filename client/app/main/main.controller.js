'use strict';

angular.module('quizzApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.question = {};

    $http.get('/api/questions/55b8f80122267d6030138dc1').success(function(question) {
      $scope.question = question;
    });
  });
