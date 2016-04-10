var server = require('http').createServer()
var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({server: server})
var express = require('express')
var app = express()
var port = process.env.PORT || 80

var users = []
var room = []

wss.on('connection', function connection (ws) {
  var user
  room.push(ws)

  ws.on('message', function incoming (msg) {
    console.log('received: %s', msg)
    var cmd = msg.split(' ')
    if (cmd[0] === 'id') {
      var id = cmd[1]
      user = users.find(function (user) { return user.id === id })
      if (!user) {
        user = {id: id, level: 0}
        users.push(user)
      }
    } else {
      for (var member of room) {
        if (member !== ws) { member.send(msg) }
      }
    }
  })

  ws.on('close', function () { room.splice(room.indexOf(ws), 1) })
})

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: 'www'})
})

app.get(/^(.+)$/, function (req, res) {
  res.sendFile(req.params[0], {root: 'www'})
})

server.on('request', app)
server.listen(port, function () { console.log('Listening on ' + server.address().port) })
