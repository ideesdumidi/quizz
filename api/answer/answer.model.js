'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  user: {type:String},
  question: {type:Number},
  answer: String,
  date: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Answer', AnswerSchema);
