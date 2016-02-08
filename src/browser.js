const SocketIO = require('socket.io-client')

exports = module.exports

exports.connect = (callback) => {
  const socket = SocketIO.connect('http://localhost:9046')
  callback(null, socket)
}

exports.exit = () => {
  require('remote').require('app').quit()
}
