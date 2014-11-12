var Lab = require('lab');
var Code = require('code');
var lab = exports.lab = Lab.script();

var experiment = lab.experiment;
var test = lab.test;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

var pp = require('./../index.js');

experiment('spicy: ', function () {
  var simpleIds = {};

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
    pp.farm.stop(function() {
      pp.close(function () {
        done();      
      });
    });
  });


  test('hook 5 clients' , {timeout: 10 * 5 * 1000}, function (done){
    pp.farm.spawn(pp.uri(), 'chrome');
    pp.farm.spawn(pp.uri(), 'chrome');
    pp.farm.spawn(pp.uri(), 'chrome');
    pp.farm.spawn(pp.uri(), 'chrome');
    pp.farm.spawn(pp.uri(), 'chrome');

    pp.waitForClients(5, function() {
      var clientIds = pp.manager.getClientIDs();
      simpleIds.A = clientIds[0];
      simpleIds.B = clientIds[1];
      simpleIds.C = clientIds[2];
      simpleIds.D = clientIds[3];
      simpleIds.E = clientIds[4];
      expect(simpleIds.A).to.not.equal(simpleIds.B);
      expect(simpleIds.B).to.not.equal(simpleIds.C);
      expect(simpleIds.C).to.not.equal(simpleIds.D);
      expect(simpleIds.D).to.not.equal(simpleIds.E);
      expect(simpleIds.E).to.not.equal(simpleIds.A);
      done();      
    });     
  });

  test('exec simple action in each client', function (done) {
    var cA = pp.manager.getClient(simpleIds.A);
    var cB = pp.manager.getClient(simpleIds.B);
    var cC = pp.manager.getClient(simpleIds.C);
    var cD = pp.manager.getClient(simpleIds.D);
    var cE = pp.manager.getClient(simpleIds.E);

    cA.command('sum', { a:1, b:8  });
    cB.command('sum', { a:1, b:13 });
    cC.command('sum', { a:2, b:21 });
    cD.command('sum', { a:3, b:34 });
    cE.command('sum', { a:5, b:55 });
    done();
  });  


  test('exec action with return in each client', function (done) {
    // var clientA = pp.clientManager.getClient(simpleIDs.A);
    // clientA.action('sum', { a:5, b:3 });
    done();
  });  

  test('do counts for pseudo external consistency', function (done) {
    // var clientA = pp.clientManager.getClient(simpleIDs.A);
    // clientA.action('sum', { a:5, b:3 });
    done();
  });  


  // test('spawn 1 browser', { timeout: 3000 * 1000 }, function (done) {
  //   var url = pp.serverStats().uri;
  //   pp.browserFarm.spawn(url, 'canary');
  //   pp.browserFarm.spawn(url, 'canary');

  //   pp.waitForClients(2, function() {
  //     var clientIDs = pp.clientManager.getClientIDs();
  //     simpleIDs.A = clientIDs[0];
  //     done();      
  //   }); 
  // });

  // test('Execute one action in one', function (done) {
  //   var clientA = pp.clientManager.getClient(simpleIDs.A);
  //   clientA.action('sum', { a:5, b:3 });
  //   done();
  // });

  // test('Execute one action in one and check the message',{timeout: 2 * 60 * 1000},  function (done) {
  //   var clientA = pp.clientManager.getClient(simpleIDs.A);
  //   clientA.action('sum-return', { a:2, b:2 });
    
  //   clientA.waitToReceive(1, function () {
  //     expect(clientA.getMessages().length).to.equal(1);
  //     expect(clientA.getMessages()[0].data.message.total).to.equal(4);
  //     done();       
  //   });
  // });


  // MOAR TESTS
  // Connect more browsers to a total of 5
  // Execute actions in all of them
  // Verify that all messages where received
  // Verify the pseudo external consistency

  // test('Verify pseudo external consistency', function (done) {
  //   done();
  // });
});