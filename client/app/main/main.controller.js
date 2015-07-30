'use strict';

angular.module('quizzApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.question = {};

    var getCurrentQuestion = function() {
      $http.get('/api/questions/current').success(function (question) {
        $scope.question = question;
      });
    };

    $scope.startAnswer = function(event){
      event.preventDefault();
    };
    $scope.answer=function(value) {
      $http.post('/api/answers', {answer: value});
    };

    socket.socket.on("answer:save", getCurrentQuestion);

    getCurrentQuestion();
  });
