exports = module.exports;

exports.createMessage = function (clientID, info) {
  return new message(clientID, info);
};

function message(clientID, info) {
  this.clientID = clientID;
  this.timestamp = info.timestamp;
  this.data = info.data;

  return this;
}

//
// clientID - id of the client that sent
// timestamp - date object of the time it was received on the server
// data - body of the createMessage