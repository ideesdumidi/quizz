/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Question = require('../api/question/question.model');

Question.find({}).remove(function(){
  Question.resetCount(function() {
    Question.create({
      label: 'quelle est la couleur?',
      answer1: 'oui',
      answer2: 'non',
    }, {
      label: 'que pensez vous de ce quizz?',
      answer1: 'génial !',
      answer2: 'j\'adore !'
    }, {
      label: 'qu\'elle est la couleur du cheval gris d\'henri IV?',
      answer1: 'blanc',
      answer2: 'noir'
    });
  });
});
