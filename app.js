var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 990 })

var users

wss.on('connection', function connection(ws) {
  var user
  
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
        ws.send('key' + cmd[1])
    }
  })
})