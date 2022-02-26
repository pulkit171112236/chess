const {Rook , Knight, Bishop, Queen, King, Pawn} = require('./pieces')

class Board {
    // initial config board
    constructor () {

        // calculating initial-state
        var blackRookLeft = new Rook('black', [0,0])
        var blackRookRight = new Rook('black', [0,7])
        var blackKnightLeft = new Knight('black', [0,1])
        var blackKnightRight = new Knight('black', [0,6])
        var blackBishopLeft = new Bishop('black', [0,2])
        var blackBishopRight = new Bishop('black', [0,5])
        var blackQueen = new Queen('black', [0,3])
        var blackKing = new King('black', [0,4])
        var blackPawnsArr = []
        for (let i = 0; i < 8; i++) blackPawnsArr.push(new Pawn('black', [1,i]))

        var whiteRookLeft = new Rook('white', [7,0])
        var whiteRookRight = new Rook('white', [7,7])
        var whiteKnightLeft = new Knight('white', [7,1])
        var whiteKnightRight = new Knight('white', [7,6])
        var whiteBishopLeft = new Bishop('white', [7,2])
        var whiteBishopRight = new Bishop('white', [7,5])
        var whiteQueen = new Queen('white', [7,3])
        var whiteKing = new King('white', [7,4])
        var whitePawnsArr = []
        for (let i = 0; i < 8; i++) whitePawnsArr.push(new Pawn('white', [6,i]))
        var initialState = [
            [blackRookLeft, blackKnightLeft, blackBishopLeft, blackQueen, blackKing, blackBishopRight, blackKnightRight, blackRookRight], //row-0
            blackPawnsArr, //row-1
            [], //row-2
            [], //row-3
            [], //row-4
            [], //row-5
            whitePawnsArr, //row-6
            [whiteRookLeft, whiteKnightLeft, whiteBishopLeft, whiteQueen, whiteKing, whiteBishopRight, whiteKnightRight, whiteRookRight],
        ]

        // declaring properties
        this.states = []
        this.states.push(initialState)
    }

    getCurrentState() {
        return this.states[this.states.length - 1]
    }

    removeLastState() {
        if (this.states.length > 1) {
            this.states.pop()
        }
    }

    getMapping() {
        var currState = this.getCurrentState()
        var mappedBoard = []
        for (let r = 0; r < 8; r++) {
            var currRow = []
            for (let c = 0; c < 8; c++) {
                var cellState = currState[r][c]
                if (cellState) currRow.push(cellState.name)
                else currRow.push("")
            }
            mappedBoard.push(currRow)
        }
        return mappedBoard
    }

    hasPiece(cursor) {
        var currState = this.getCurrentState()
        var row = cursor[0]
        var col = cursor[1]
        return currState[row][col] ? true : false
    }

    move(cursor, newPos) {
        var prow = cursor[0]
        var pcol = cursor[1]
        var nrow = newPos[0]
        var ncol = newPos[1]
        var currState = this.getCurrentState()
        var newState = JSON.parse(JSON.stringify(currState))
        newState[prow][pcol] = undefined
        newState[nrow][ncol] = currState[prow][pcol]
        this.states.push(newState)
    }
}

module.exports = Board