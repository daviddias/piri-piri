var hapi = require('hapi');
var moonboots = require('moonboots_hapi');
var io = require('socket.io');
var launcher = require('browser-launcher2');
var async = require('async');

exports = module.exports;

var server;
var browsers = [];
//
// client struct
//    socket
//    messageQueue
//    
var clients = {};

// options
// path to file to serve
// port to serve from
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
        io.listen(server.listener).on('connection', ioConnectionHandler);
        console.log('hapi server started and socket.io server attached\n');
        cb();
      });
  });

  function ioConnectionHandler(socket){
    clients[socket.id] = {
      socket: socket,
      messageQueue: []
    };

    socket.on('message', function (data) {
      // Insert what time we received this message?
      clients[socket.id].messageQueue.push(data);
    });    
  }
};

exports.close = function (cb) {
  server.stop({ timeout: 1 * 1000 }, cb);
};

exports.getClientIDs = function () {
  return Object.keys(clients);
};

exports.action = function(clientID, command, data) {
  clients[clientID].socket.emit(command, data);
};

exports.getMessages = function () {
  // do in pseudo cronological order
  var result = [];
  Object.keys(clients).map(function (key) { result.concat(clients[key].messageQueue);});
  return result;
};

exports.getMessagesByClient = function(clientID) {
  return clients[clientID].messageQueue;
};

exports.clearMessages = function () {
  Object.keys(clients).map(function (key) {clients[key].messageQueue = [];}); 
};

exports.clearMessagesByClient = function (clientID) {
  clients[clientID].messageQueue = [];
};



  
exports.spawnBrowser = function (url, browserType, cb) {
  launcher(function(err, launch) {
    if (err) { return cb (err); }
    launch(url, browserType, function(err, instance) {
      if (err) { return cb(err); }
      browsers.push(instance);
      instance.on('stop', function(code) {
        console.log( 'Instance stopped with exit code:', code );
      });
    });        

  });
};

exports.stopBrowsers = function (cb){ 
  browsers.map(function (browser) {
    browser.stop(function () {
    });
  });
   cb();
};

exports.waitForClients = function (n, cb) {
  function wait(){
    if (Object.keys(clients).length === n) {
      return cb();
    }
    setTimeout(wait, 500);
  }
  wait();
};




exports.serverStats = function(){
  return server.info;
};

// have to have endpoints for commands
// have to have endpoint for data pipe
// export a event emitter for the data piped
// export a event emitter for the command (can be all be the same, but filtered maybe)