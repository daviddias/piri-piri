var pp = require('piri-piri.client');

window.app = {
  init: function () {
    var counter = 0;

    var options = { url: 'http://localhost:9876' };

    pp.start(options, function () {
      console.log('piri-piri client is ready');

      pp.register('sum', function (data) {
        var total = data.a + data.b;
        console.log('sum:' , total);
      });

      pp.register('sum-return', function (data) {
        console.log('sum-return');
        pp.tell({total: data.a + data.b});
      });

      pp.register('add-to-counter', function (data) {
        counter = data.value;
        pp.tell({counter: counter});
      });

    });
  }
};

window.app.init();