const express = require('express')
const router = express.Router()

const Board = require('../models/board')
const socket = require('../socket')

var board = new Board()

router.get('/', (req, res, next) => {
  console.log(req.query.player)
  return res.render('chessview', {
    board: board.getMapping(),
    cursor: null,
    player: req.query.player || 'white',
  })
})

router.post('/', (req, res, next) => {
  console.log(req.body)

  const from = req.body.from
  const to = req.body.to

  var cursor = [from.row, from.col]
  var newPos = [to.row, to.col]

  console.log('prev-pos', cursor)
  console.log('new-pos', newPos)

  // check if board contains piece at cursor
  if (board.hasPiece(cursor)) {
    // move the piece at cursor to new-pos
    board.move(cursor, newPos)
    // emiting message to all connected clients
    socket.getIo().emit('event', {
      action: 'move',
      from: from,
      to: to,
    })
    // returning response
    res.status(200).json({
      message: 'success',
      action: 'move',
    })
  } else {
    const err = new Error('Move not allowed')
    err.statusCode = 405
    throw err
  }

  // return res.redirect('/?player=' + req.body.player)
})

router.post('/action', (req, res, next) => {
  var action = req.body.action
  if (action === 'undo') {
    console.log('-------------undo-----------')
    board.removeLastState()
  } else if (action === 'restart') {
    console.log('----------restarting---------')
    board = new Board()
  }
  // emiting message to all connected clients
  socket.getIo().emit('event', {
    action: action,
  })
  // return res.redirect('/')
})

module.exports = router
