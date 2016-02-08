const electron = require('electron-spawn')
const SocketIO = require('socket.io')
const http = require('http')
const debug = require('debug')
const log = debug('piri-piri')

var started = false
const clients = {}

exports = module.exports

exports.clients = clients

exports.start = (callback) => {
  const server = http.createServer((req, res) => {})
  server.listen(9046)
  const io = new SocketIO(server)
  started = true

  io.on('connection', (sock) => {
    log('new conn', sock.id)

    clients[sock.id] = sock

    sock.on('close', () => {
      delete clients[sock.id]
    })
  })
  const api = {
    send: (id, msg, data) => {
      if (!clients[id]) {
        throw new Error('no client with that Id')
      }
      clients[id].emit(msg, data)
    }
  }
  callback(null, api)
}

exports.browser = {}

exports.browser.spawn = (scriptPath, quantity, callback) => {
  if (!started) {
    throw new Error('piri-piri listener is not started yet')
  }

  const instance = electron(scriptPath, {
    detached: true
  })

  const errors = []

  instance.on('exit', () => {
    if (errors.length > 0) {
      return callback(errors)
    }
    callback()
  })

  instance.stderr.on('data', function (data) {
    errors.push(data.toString())
  })
}
