var launch = require('launchpad');
var async = require('async');

exports = module.exports;

var browsers = [];

exports.spawn = function (url, browserType, cb) {
  launch.local(function(err, local) {
    local[browserType](url, function(err, instance) {
      browsers.push(instance);
      instance.on('stop', function() { console.log('Terminated browser instance'); });
      if (cb) { cb(); }
    });
  });
};

exports.stop = function (cb) {
  async.map(browsers, function (browser, cbAsync) {
    browser.stop(cbAsync);
  }, function(err, results){
    cb(err);
  });
};
