class King {
    constructor (color, position) {
        this.color = color
        this.position = position
        this.name = color + "King"
    }
}
class Queen {
    constructor (color, position) {
        this.color = color
        this.position = position
        this.name = color + "Queen"
    }
}
class Rook {
    constructor (color, position) {
        this.color = color
        this.position = position
        this.name = color + "Rook"
    }
}
class Bishop {
    constructor (color, position) {
        this.color = color
        this.position = position
        this.name = color + "Bishop"
    }
}
class Knight {
    constructor (color, position) {
        this.color = color
        this.position = position
        this.name = color + "Knight"
    }
}

class Pawn {
    constructor (color, position) {
        this.color = color
        this.position = position
        this.name = color + "Pawn"
    }
}

module.exports = {King, Queen, Rook, Bishop, Knight, Pawn}