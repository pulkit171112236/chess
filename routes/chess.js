const express = require('express')
const router = express.Router()

const Board = require('../models/board')
const socket = require('../socket')

var board = new Board()
var cursor = undefined

router.get('/', (req, res, next) => {
  console.log(req.query.player)
  return res.render('chessview', {
    board: board.getMapping(),
    cursor: cursor,
    player: req.query.player || 'white',
  })
})

router.post('/', (req, res, next) => {
  console.log(req.body)
  if (!req.body.row) return res.redirect('/')
  var row = parseInt(req.body.row)
  var col = parseInt(req.body.col)

  var newPos = [row, col]
  console.log('prev-pos', cursor)
  console.log('new-pos', newPos)

  // set the cursor if not
  if (!cursor) {
    cursor = [row, col]
  }

  // check if board contains piece at cursor
  else if (board.hasPiece(cursor)) {
    // move the piece at cursor to new-pos
    board.move(cursor, newPos)
    cursor = undefined
  } else {
    cursor = undefined
  }
  socket.getIo().emit('event')
  return res.redirect('/?player=' + req.body.player)
})

router.post('/action', (req, res, next) => {
  var action = req.body.action
  if (action === 'undo') {
    console.log('-------------undo-----------')
    board.removeLastState()
    cursor = undefined
  } else if (action === 'restart') {
    console.log('----------restarting---------')
    board = new Board()
    cursor = undefined
  }
  socket.getIo().emit('event')
  return res.redirect('/')
})

module.exports = router
