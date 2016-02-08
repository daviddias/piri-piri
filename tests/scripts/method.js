const ppc = require('../../src').client

module.exports = function (args) {
  ppc.handle('sum', (arr) => {
    var sum = Number(arr[0] + arr[1])
    ppc.send(sum)
  })

  ppc.connect((err) => {
    if (err) {
      return console.log(err)
    }
  })
}
