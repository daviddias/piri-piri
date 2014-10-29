var launcher = require('browser-launcher2');

exports = module.exports;

var browsers = [];

exports.spawnBrowser = function (url, browserType, cb) {
  launcher(function(err, launch) {
    if (err) { 
      return cb(err); 
    }

    launch(url, browserType, function(err, instance) {
      if (err) { 
        return cb(err);
      }
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