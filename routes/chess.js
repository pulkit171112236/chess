const { shallowCopy } = require('ejs/lib/utils')
const express = require('express')
const router = express.Router()

const Board = require('../models/board')

var board = new Board()
var prevPos = undefined

router.get('/', (req, res, next) => {
    var mappedBoard = []
    for (let r = 0; r < 8; r++) {
        var currRow = []
        for (let c = 0; c < 8; c++) {
            var cellState = board.state[r][c]
            if (cellState) currRow.push(cellState.name)
            else currRow.push("")
        }
        mappedBoard.push(currRow)
    }
    return res.render('chessview', {
        board: mappedBoard,
        cursor: prevPos
    })
})

router.post('/', (req, res, next) => {
    console.log(req.body)
    if (!req.body.row) return res.redirect('/')
    var row = parseInt(req.body.row)
    var col = parseInt(req.body.col)
    var currPos = [row, col]
    console.log('prev-pos', prevPos)
    console.log('curr-pos', currPos)
    if (!prevPos) {
        prevPos = [row, col]
    }
    else if (prevPos[0] == row && prevPos[1] == col) {
        console.log('same')
        prevPos = undefined
    }
    else {
        var prow = prevPos[0]
        var pcol = prevPos[1]
        board.state[row][col] = board.state[prow][pcol]
        board.state[prow][pcol] = undefined
        prevPos = undefined
    }
    return res.redirect('/')
})

router.post('/start-new', (req, res, next) => {
    console.log("----------restarting---------")
    board = new Board()
    prevPos = undefined
    return res.redirect('/')
})

module.exports = router