'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');

var QuestionSchema = new Schema({
  label: String,
  answer1: String,
  answer2: String,
  type:String,
  params:String,
  active: {
    type: Boolean,
    default: true
  }
});

QuestionSchema.plugin(autoIncrement.plugin, { model: 'Question', field: 'index', startAt:1 });

module.exports = mongoose.model('Question', QuestionSchema);
