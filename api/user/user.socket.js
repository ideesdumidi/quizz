/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var User = require('./user.model');

exports.register = function(socket) {
  User.schema.post('save', function (doc) {
  socket.emit('user:save');
  });
}