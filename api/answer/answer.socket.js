'use strict';

var Answer = require('./answer.model');
var User = require('../user/user.model');
var Question = require('../question/question.model');

exports.register = function (socket) {
    socket.on('answer:add', function (answer) {
        var userId = socket.handshake.query.user;

        User.getCurrentUser(userId, function (user) {
            var answerModel = new Answer({ answer: answer, user: user.id, question: user.question });
            answerModel.save(function (err) {
                var nextQuestionId = ++user.question;
                Question.findOne({ index: nextQuestionId }, function (err) {
                    user.question = err ? 1 : nextQuestionId;
                    user.save();
                });
            });

        });
    });
}