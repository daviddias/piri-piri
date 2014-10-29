var Lab = require('lab');
var Code = require('code');
var lab = exports.lab = Lab.script();

var experiment = lab.experiment;
var test = lab.test;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;


var pp = require('./../index.js');

experiment('A pinch of piri-piri a day, keeps the doctor away.', function () {

  var simpleIDs = {};

  before(function (done) {
    var options = {
      path: __dirname + '/serve_this.js',
      port: 9876,
      host: 'localhost'
    };
    
    pp.start(options, function(err) {
      if (err) { console.log(err); process.exit(1); }
      done();
    });
  });

  after(function (done) {

    pp.stopBrowsers(function() {
      pp.close(function (){
        done();      
      });
    });

  });

  test('Spawn and Connect 3 browsers', { timeout: 60 * 1000 }, function (done) {
    var url = pp.serverStats().uri;
    pp.spawnBrowser(url, 'chrome', function() {});
    pp.spawnBrowser(url, 'firefox', function() {});

    pp.waitForClients(2, function() {
        var clientIDs = pp.getClientIDs();
        simpleIDs.A = clientIDs[0];
        simpleIDs.B = clientIDs[1];
        done();      
    }); 
  });

  test('Execute one action in one', function (done) {
    pp.action(simpleIDs.A, 'sum', {a:5, b:3});
    done();
  });

  test('Execute one action in one and check the message', function (done) {
    pp.action(simpleIDs.A, 'sum-return', {a:2, b:2});
    setTimeout(function(){
      var messages = pp.getMessagesByClient(simpleIDs.A);
      expect(messages.length).to.equal(1);
      expect(messages[0].total).to.equal(4);
      done();  
    }, 500);
  });

  // test('Execute one action and speficically get the message with the answer to that action', function (done) {
  //   done();
  // });

  // test('Execute ten actions in all of three and check messages', function (done) {
    
  //   done();
  // });


  // test('Verify pseudo external consistency', function (done) {
  //   done();
  // });

});