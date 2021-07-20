class Knight extends Piece{
    constructor(row, col, isWhite){
        super(row, col, isWhite); 
        this.symbol = isWhite ? "♘" : "♞"; 
    }

    show(){
        super.show(this.symbol); 
    }

    generateMoves(){
        let moves = []; 
        let possibleDirections = [[-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1]]; 
        for(let i = 0; i < possibleDirections.length; i++){
            let newR = this.row + possibleDirections[i][0];
            let newC = this.col + possibleDirections[i][1];

            // Move is only invalid if it is occupied by a same coloured piece or the area is out of bounds
            if(board.inBounds(newR, newC) && !(board.occupied(newR, newC) && board.grid[newR][newC].isWhite == this.isWhite)){
                moves.push([newR, newC]); 
            }
        }
        return moves
        
    }
}