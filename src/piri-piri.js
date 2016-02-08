const electron = require('electron-spawn')
const SocketIO = require('socket.io')
const http = require('http')
const debug = require('debug')
const log = debug('piri-piri')

var started = false
const clients = {} // socket and msgs

exports = module.exports

exports.clients = clients

exports.start = (callback) => {
  const server = http.createServer((req, res) => {})
  server.listen(9046)
  const io = new SocketIO(server)
  started = true

  io.on('connection', (sock) => {
    log('new conn', sock.id)

    clients[sock.id] = {}
    clients[sock.id].socket = sock
    clients[sock.id].msgs = []

    clients[sock.id].socket.on('msg', (data) => {
      clients[sock.id].msgs.push(data)
    })

    sock.on('close', () => {
      delete clients[sock.id]
    })
  })
  callback()
}

exports.browser = {}

exports.browser.spawn = (scriptPath, quantity, callback) => {
  if (!started) {
    throw new Error('piri-piri listener is not started yet')
  }

  var counter = 0
  while (counter < quantity) {
    spawnOne(scriptPath)
    counter += 1
  }

  function spawnOne (scriptPath) {
    const instance = electron(scriptPath, {
      detached: true
    })

    const errors = []

    instance.stderr.on('data', function (data) {
      errors.push(data.toString())
    })

    instance.stdout.on('data', function (data) {
      console.log(data.toString())
    })

    instance.on('exit', () => {
      counter--
      if (counter === 0) {
        end()
      }
    })

    function end () {
      if (errors.length > 0) {
        return callback(errors)
      }
      callback()
    }
  }
}

exports.browser.send = function (id, action) {
  if (!clients[id]) {
    throw new Error('no client with that Id')
  }
  var args = Object.keys(arguments).map((key) => { return arguments[key] })

  args.shift()
  args.shift()

  clients[id].socket.emit(action, args)
}
