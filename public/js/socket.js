console.log('------client-socket--------')
const socket = io()
socket.on('event', (data) => {
  console.log('--event---')
  window.location = window.location.href
})
