// var Lab = require('lab');
// var Code = require('code');
// var lab = exports.lab = Lab.script();

// var experiment = lab.experiment;
// var test = lab.test;
// var before = lab.before;
// var after = lab.after;
// var expect = Code.expect;

// var pp = require('./../index.js');

// experiment('spicy: ', function () {
//   var simpleIDs = {};

//   before(function (done) {
//     var options = {
//       path: __dirname + '/serve_this.js',
//       port: 9876,
//       host: 'localhost'
//     };
    
//     pp.start(options, function(err) {
//       if (err) { console.log(err); process.exit(1); }
//       done();
//     });
//   });

//   after(function (done) {
//     pp.browserFarm.stop(function() {
//       pp.close(function () {
//         done();      
//       });
//     });
//   });

//   test('spawn')





//   test('spawn 1 browser', { timeout: 3000 * 1000 }, function (done) {
//     var url = pp.serverStats().uri;
//     pp.browserFarm.spawn(url, 'canary');
//     pp.browserFarm.spawn(url, 'canary');

//     pp.waitForClients(2, function() {
//       var clientIDs = pp.clientManager.getClientIDs();
//       simpleIDs.A = clientIDs[0];
//       done();      
//     }); 
//   });

//   test('Execute one action in one', function (done) {
//     var clientA = pp.clientManager.getClient(simpleIDs.A);
//     clientA.action('sum', { a:5, b:3 });
//     done();
//   });

//   test('Execute one action in one and check the message',{timeout: 2 * 60 * 1000},  function (done) {
//     var clientA = pp.clientManager.getClient(simpleIDs.A);
//     clientA.action('sum-return', { a:2, b:2 });
    
//     clientA.waitToReceive(1, function () {
//       expect(clientA.getMessages().length).to.equal(1);
//       expect(clientA.getMessages()[0].data.message.total).to.equal(4);
//       done();       
//     });
//   });


//   // MOAR TESTS
//   // Connect more browsers to a total of 5
//   // Execute actions in all of them
//   // Verify that all messages where received
//   // Verify the pseudo external consistency

//   // test('Verify pseudo external consistency', function (done) {
//   //   done();
//   // });
// });