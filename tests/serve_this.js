var ppClient = require('piri-piri.client');

window.app = {
  init: function () {
    console.log('Resource Loaded');

    var options = { url: 'http://localhost:9876' };
    
    ppClient.start(options, function () {
      console.log('piri-piri client is ready');

      ppClient.registerAction('sum', function (data) {
        var total = data.a + data.b;
        console.log(total);
      });

      ppClient.registerAction('sum-return', function (data) {
        ppClient.sendMessage({total: data.a + data.b});
      });
    });
  }
};

window.app.init();