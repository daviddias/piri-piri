var Message = require('./Message.js');
exports = module.exports;

exports.createClient = function (socket) {
  return new client(socket);
};

function client (socket) {
  var queue = [];

  socket.on('info', function (info) {
    var message = Message.createMessage(socket.id, info);
    queue.push(message);
  });    

  this.getQ = function () {
    return queue;
  };

  this.clearQ = function () {
    queue = [];
  };

  this.sortedQ = function () {
    // sort pseudo chronologically
  };

  this.waitToReceive = function (n, cb) {
    function check() {
      if (queue.length >= n) { 
        return cb(); 
      } else { setTimeout(check, 500); }
    }
    check();
  };

  this.command = function(order, data) {
    socket.emit('execute', {
      order: order,
      data: data
    });
  };

  return this;
}