var hapi = require('hapi');
var moonboots = require('moonboots_hapi');
var io = require('socket.io');
var async = require('async');
var clientManager = require('./modules/clientManager.js');
var browserFarm = require('./modules/browserFarm.js');

exports = module.exports;
exports.clientManager = clientManager;
exports.browserFarm = browserFarm;

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
        moonboots: {
          main: path,
          developmentMode: true,
        }
      }
    }, function () {
      server.start(function () {
        io.listen(server.listener).on('connection', clientManager.incommingClient);
        console.log('hapi server started and socket.io server attached\n');
        cb();
      });
  });
};

exports.close = function (cb) {
  server.stop({ timeout: 1 * 1000 }, cb);
};

exports.waitForClients = function (n, cb) {
  function wait() {
    if (clientManager.getClientIDs().length === n) {
      return cb();
    }
    setTimeout(wait, 500);
  }
  wait();
};

exports.serverStats = function(){
  return server.info;
};