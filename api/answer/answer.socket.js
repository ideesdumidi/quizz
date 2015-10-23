'use strict';

var Answer = require('./answer.model');
var User = require('../user/user.model');
var Question = require('../question/question.model');

exports.register = function (socket) {
    
  Answer.schema.post('save', function (doc) {
            socket.emit("answered", doc.answer);
  });
  
    socket.on('answer:add', function (answer) {
        var userId = socket.handshake.query.user;

        User.getCurrentUser(userId, function (user) {
            var answerModel = new Answer({ answer: answer, user: user.id, question: user.question });
            answerModel.save(function (err) {
                if(err)
                return;
                
                var nextQuestionId = ++user.question;
                Question.findOne({ index: nextQuestionId }, function (err, question) {
                    user.question = (err || !question) ? 1 : nextQuestionId;
                    user.save();
                });
            });
        });
    });
}