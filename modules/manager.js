var Client = require('./../models/client.js');

exports = module.exports;

var clients = {};

exports.incommingClient = function (socket) {
  clients[socket.id] = Client.createClient(socket);
};

exports.getClientIDs = function () {
  return Object.keys(clients);
};

exports.getClient = function (clientID) {
  return clients[clientID];
};

exports.getGlobalPseudoChronologicalOrder = function () {
  // PSEUDO 
};