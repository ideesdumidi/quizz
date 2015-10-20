/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Question = require('./question.model');
var User = require('../user/user.model');

exports.register = function (socket) {
  socket.on('question:requestCurrent', getCurrentQuestion);

  getCurrentQuestion();


  function getCurrentQuestion() {
    var userId = socket.handshake.query.user;
    User.getCurrentUser(userId, function (user) {
      Question.findOne({ index: user.question }).then(function (question) {
        socket.emit('question:current', question);
      });
    });
  }

};