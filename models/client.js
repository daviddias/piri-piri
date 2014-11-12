var Message = require('./Message.js');
exports = module.exports;

exports.createClient = function (_socket) {
  return new client(_socket);
};

function client (_socket) {
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

  this.waitToReceive = function (n, cb) {
    function check() {
      if (messageQueue.length >= n) { return cb(); } 
      else { setTimeout(check, 500); }
    }
    check();
  };

  this.action = function(command, data) {
    socket.emit(command, data);
  };

  return this;
}