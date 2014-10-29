var Message = require('./Message.js');
exports = module.exports;

exports.createClient = function (_socket) {
  var socket = _socket;
  var messageQueue = [];

  socket.on('message', function (data) {
    var message = Message.createMessage(socket.id, data);
    messageQueue.push(message);
  });    

  this.getMessages = function() {
    return messageQueue;
  };

  this.clearMessages = function() {
    messageQueue = [];
  };

  this.action = function(command, data) {
    socket.emit(command, data);
  };

  return this;
};