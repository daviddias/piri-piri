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
    pp.browserFarm.stop(function() {
      pp.close(function (){
        done();      
      });
    });

  });

  test('Spawn and Connect 3 browsers', { timeout: 60 * 1000 }, function (done) {
    var url = pp.serverStats().uri;
    // console.log('CONNECT TO: ', url);
    pp.browserFarm.spawn(url, 'chrome', function() {});
    pp.browserFarm.spawn(url, 'opera', function() {});

    pp.waitForClients(2, function() {
        var clientIDs = pp.clientManager.getClientIDs();
        simpleIDs.A = clientIDs[0];
        simpleIDs.B = clientIDs[1];
        done();      
    }); 
  });

  test('Execute one action in one', function (done) {
    var clientA = pp.clientManager.getClient(simpleIDs.A);
    clientA.action('sum', { a:5, b:3 });
    done();
  });

  test('Execute one action in one and check the message', function (done) {
    var clientA = pp.clientManager.getClient(simpleIDs.A);
    clientA.action('sum-return', {a:2, b:2});
    
    setTimeout(function() {
      expect(clientA.getMessages().length).to.equal(1);
      expect(clientA.getMessages()[0].data.total).to.equal(4);
      done();  
    }, 800);
  });


  // test('Execute ten actions in all of three and check messages', function (done) {    
  //   done();
  // });


  // test('Verify pseudo external consistency', function (done) {
  //   done();
  // });

});