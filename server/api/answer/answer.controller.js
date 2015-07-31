'use strict';

var _ = require('lodash');
var Answer = require('./answer.model');
var User = require('./../user/user.model');
var Question = require('./../question/question.model');

// Get list of answers
exports.index = function(req, res) {
  Answer.find(function (err, answers) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(answers);
  });
};

// Get a single answer
exports.show = function(req, res) {
  Answer.findById(req.params.id, function (err, answer) {
    if(err) { return handleError(res, err); }
    if(!answer) { return res.status(404).send('Not Found'); }
    return res.json(answer);
  });
};

// Creates a new answer in the DB.
exports.create = function(req, res) {

  User.findOne().where("key").equals("local").exec(function (err, user) {

    if (err) {
      return handleError(res, err);
    }
    if (!user) {
      return res.status(404).send('Not Found');
    }
    Question.findOne().where("index").equals(user.question).exec(function (err, question) {

      if (err) {
        return handleError(res, err);
      }
      if (!question) {
        return res.status(404).send('Not Found');
      }

    req.body.user = user._id;
      req.body.question = question._id;


    Answer.create(req.body, function (err, answer) {

      if (err) {
        return handleError(res, err);
      }

      return setNextQuestion(req, res, user, answer);


    });
  });
  });
};

var setNextQuestion =  function (req, res, user, answer) {
    Question.findOne().where("index").gt(user.question).exec(function (err, question) {
      if (err) {
        return handleError(res, err);
      }
      if (!question) {
        Question.findOne().where("index").gt(0).exec(function (err, question) {
          if (err) {
            return handleError(res, err);
          }
          return updateUserQuestion(res, question, user, answer);
        });
      } else {
        return updateUserQuestion(res, question, user, answer);
      }
    });
}


var updateUserQuestion = function (res,question, user, answer) {
  if (!question) {
    return res.status(404).send('Not Found');
  }
  user.question = question.index;
  user.save();
  return res.status(201).json(answer);
};

// Updates an existing answer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Answer.findById(req.params.id, function (err, answer) {
    if (err) { return handleError(res, err); }
    if(!answer) { return res.status(404).send('Not Found'); }
    var updated = _.merge(answer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(answer);
    });
  });
};

// Deletes a answer from the DB.
exports.destroy = function(req, res) {
  Answer.findById(req.params.id, function (err, answer) {
    if(err) { return handleError(res, err); }
    if(!answer) { return res.status(404).send('Not Found'); }
    answer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
