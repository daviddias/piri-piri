const ppc = require('../../src').client

module.exports = function (args) {
  ppc.connect((err, socket) => {
    if (err) {
      return console.log(err)
    }
    socket.on('exit', ppc.exit)
  })
}
