var launch = require('launchpad');
var async = require('async');

exports = module.exports;

var browser;

exports.spawn = function (url, browserType, cb) {
  launch.local(function(err, local) {
    local[browserType](url, function(err, instance) {
      if (browser === undefined) {
        browser = instance; // an instance represents the browser and not each tab
        instance.on('stop', function() { 
          // console.log('Terminated browser instance'); 
        });
      }
      
      if (cb) { cb(err); }
    });
  });
};

exports.stop = function (cb) {
  browser.stop(cb);
};
