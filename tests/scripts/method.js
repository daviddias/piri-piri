const ppc = require('../../src').client

module.exports = function (args) {
  ppc.handle('sum', (a, b) => {
    ppc.send('msg', 'the sum is: ' + a + b)
  })

  ppc.connect((err) => {
    if (err) {
      return console.log(err)
    }
  })
}
