class Pawn extends Piece{
    constructor(row, col, isWhite){
        super(row, col, isWhite);     
        this.symbol = isWhite ? "♙" : "♟"; 
    }

    show(){
        super.show(this.symbol); 
    }

    generateMoves(){ 
        let moves = []; 
        let dr = this.isWhite ? -1 : 1; // This currently assumes white is at bottom of board

        // pawn can only move forward if the square is unoccupied
        if(!board.occupied(this.row + dr, this.col)){
            moves.push([this.row+dr, this.col]);

            // Only checks the double move if the single move was possible
            if(this.firstMove && !board.occupied(this.row + 2*dr, this.col)){
                moves.push([this.row + 2*dr, this.col]); 
            }

        }

        // pawn can move diagonally if its occupied by the opposite colour
        if(board.inBounds(this.row+dr, this.col+1) && board.occupied(this.row+dr, this.col+1)){
            if(board.grid[this.row+dr][this.col+1].isWhite != this.isWhite){
                moves.push([this.row+dr, this.col+1]); 
            } 
        }

        if(board.inBounds(this.row+dr, this.col-1) && board.occupied(this.row+dr, this.col-1)){
            if(board.grid[this.row+dr][this.col-1].isWhite != this.isWhite){
                moves.push([this.row+dr, this.col-1]); 
            } 
        } 

    return moves;
    }
}
