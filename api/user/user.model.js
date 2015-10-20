'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: String,
  question: {type:Number, default:1}
});

var UserModel = mongoose.model('User', UserSchema)

// assign a function to the "methods" object of our animalSchema
UserModel.getCurrentUser = function (userId, callback) {
  this.findOne({ id: userId }, function(err, user){
    if(!user)
    {
      user = new UserModel({id:userId});
      user.save(function(err){
        if(!err){
          callback(user);
        }else
        callback(null);
      }) 
    }else{
      callback(user);
    }
  });
};

module.exports = UserModel;
