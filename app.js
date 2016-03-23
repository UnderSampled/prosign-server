var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: process.env.PORT || 80 })

var users = []
var room = []

wss.on('connection', function connection(ws) {
  var user
  room.push(ws)

  ws.on('message', function incoming(msg) {
    console.log('received: %s', msg)
    cmd = msg.split(' ')
    switch (cmd[0]) {
      case 'id':
        id = cmd[1]
        user = users.find(function (user) {return user.id === id})
        if (!user)
          user = {id: id, level: 0}
          users.push(user)
        break
      case 'key':
	for (member of room) {
          if (member !== ws) member.send(['key', cmd[1]].join(' '))
        }
        console.log(room.length)
    }
  })

  ws.on('close', function () { room.splice(room.indexOf(ws), 1)})
})
