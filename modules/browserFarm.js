var launcher = require('browser-launcher2');
var spawn = require('child_process').spawn;

var browsers = [];

exports = module.exports;

var browsers = [];

exports.spawn = function (url, browserType, cb) {
  var browser;
  if (browserType === 'chrome') {
    browser = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [url]);
  }
  if (browserType === 'canary') {
    browser = spawn('/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary', [url]);
  }

  browser.stdout.on('data', function (data) {
    // console.log('stdout: ' + data);
  });
  browser.stderr.on('data', function (data) {
    // console.log('stderr: ' + data);
  });
  browser.on('close', function (code) {
    console.log('browser exited with: ' + code);  
  }); 

  browsers.push(browser);
  setTimeout(function(){
    cb();  
  },700);
  
  // Old code using browser Launcher
  // launcher(function(err, launch) {
  //   if (err) { 
  //     return cb(err); 
  //   }
  //   launch(url, browserType, function(err, instance) {
  //     if (err) { 
  //       return cb(err);
  //     }
  //     browsers.push(instance);
  //     instance.on('stop', function(code) {
  //       console.log( 'Instance stopped with exit code:', code );
  //     });
  //   });  
  // });
};

exports.stop = function (cb){ 
  browsers.map(function(browser) {browser.kill();});
  cb();
};
