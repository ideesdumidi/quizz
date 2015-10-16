'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  ip: String,
  question: {type:Number, default:1}
});



module.exports = mongoose.model('User', UserSchema);
