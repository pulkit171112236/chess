const { shallowCopy } = require('ejs/lib/utils')
const express = require('express')
const router = express.Router()

const Board = require('../models/board')

const board = new Board()
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
        board: mappedBoard
    })
})

module.exports = router