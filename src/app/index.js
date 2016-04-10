/* global WebSocket */
'use strict'

var id = 'web'
var serverUrl = 'ws://' + window.location.host

var ws = new WebSocket(serverUrl)
ws.onopen = function () {
  ws.send(['id', id].join(' '))
}

function transmit (method, message) {
  ws.send([method, message].join(' '))
}

var keyer = document.getElementById('keyer')
keyer.addEventListener('touchstart', function () {
  keyer.classList.add('hot')
  transmit('key', true)
})
keyer.addEventListener('touchend', function () {
  keyer.classList.remove('hot')
  transmit('key', false)
})

var text = document.getElementById('text')
var form = document.getElementById('messageBox')
function submit () { // eslint-disable-line
  transmit('msg', text.value)
  text.value = ''
}
form.action = 'javascript:submit()'
