var hapi = require('hapi');
var moonboots = require('moonboots_hapi');
var io = require('socket.io');
var async = require('async');
var manager = require('./modules/manager.js');
var farm = require('./modules/farm.js');

exports = module.exports;
exports.manager = manager;
exports.farm = farm;

var server;

exports.start = function (options, cb) {
  if (!options.path) {
    return cb(new Error('No file path to serve'));
  }
  var path = options.path;
  var port = options.port || 9786;
  var host = options.host || 'localhost';  

  server = new hapi.Server(port, host, { cors: true });

  server.pack.register({
      plugin: moonboots,
      options: {
        appPath: '/',
        moonboots: { main: path, developmentMode: true, }
      }
    }, function () {
      server.start(function () {
        io.listen(server.listener).on('connection', manager.incommingClient);
        cb();
      });
  });
};

exports.close = function (cb) {
  server.stop({ timeout: 1 * 1000 }, cb);
};

exports.waitForClients = function (n, cb) {
  function wait() {
    if (manager.getClientIDs().length >= n) {
      return cb();
    }
    setTimeout(wait, 500);
  }
  wait();
};

exports.uri = function() {
  return server.info.uri;
};