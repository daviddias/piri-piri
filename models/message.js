exports = module.exports;

exports.createMessage = function (_clientID, _data) {
  this.clientID = _clientID;
  this.timestamp = Date.now();
  this.data = _data;

  return this;
};

//
// clientID - id of the client that sent
// timestamp - date object of the time it was received on the server
// data - body of the createMessage