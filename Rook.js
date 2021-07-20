class Rook extends Piece{
    constructor(row, col, isWhite){
        super(row, col, isWhite); 
        this.symbol = isWhite ? "♖" : "♜"; 
    }
    
    show(){
        super.show(this.symbol); 
    }

    generateMoves(){
        let dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]]; 
        return this.checkDirections(dirs);
    }
}