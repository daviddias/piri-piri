const SocketIO = require('socket.io-client')

var socket
const handles = {}

exports = module.exports

exports.connect = (callback) => {
  socket = SocketIO.connect('http://localhost:9046')
  socket.on('exit', exports.exit)
  Object.keys(handles).forEach((action) => {
    socket.on(action, handles[action])
  })
  callback(null, socket)
}

exports.exit = () => {
  require('remote').require('app').quit()
}

exports.handle = (action, func) => {
  handles[action] = func
}

exports.send = (msg) => {
  socket.emit('msg', msg)
}
