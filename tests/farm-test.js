var Lab = require('lab');
var Code = require('code');
var lab = exports.lab = Lab.script();

var experiment = lab.experiment;
var test = lab.test;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

var pp = require('./../index.js');

experiment('farm test: ', function () {
  var simpleIDs = {};

  before(function (done) {
    done();
  });

  after(function (done) {
    pp.farm.stop(function() {
      done();      
    });
  });



  test('spawn 1 browser', { timeout: 5 * 1000 }, function (done) {
    var url = 'http://www.theinternet.com/';
    pp.farm.spawn(url, 'chrome', function (err){
      done(err);
    });
  });

  test('stop 1 browser', { timeout: 5 * 1000 }, function (done) {
    pp.farm.stop(function (err){
      done(err);
    });
  });

  test('spawn 20 browser', { timeout: 10 * 5 * 1000 }, function (done) {
    var url = 'http://www.theinternet.com/';
    
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});  
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}});
    pp.farm.spawn(url, 'chrome', function (err) { if (err) {done(err);}}); 
    setTimeout(done, 1500); 
  });

  test('stop 20 browser', { timeout: 5 * 1000 }, function (done) {
    pp.farm.stop(function (err){
      done(err);
    });
  });

});