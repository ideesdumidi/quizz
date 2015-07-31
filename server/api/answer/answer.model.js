'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  user: Schema.Types.ObjectId,
  question: Schema.Types.ObjectId,
  answer: String,
  date: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Answer', AnswerSchema);
