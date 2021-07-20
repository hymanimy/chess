class King extends Piece {
    constructor(row, col, isWhite){
        super(row, col, isWhite);
        this.symbol = this.isWhite ? "♔" : "♚";  
    }

    show(){
        super.show(this.symbol); 
    }

    generateMoves(){
        // Check all cells directly next to king square
        let moves = []; 
        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){
                if(!(i == 0 && j == 0)){
                    let newR = this.row + i; 
                    let newC = this.col + j; 
                    if(board.inBounds(newR, newC) && !(board.occupied(newR, newC) && board.grid[newR][newC].isWhite == this.isWhite)){
                        moves.push([newR, newC]);
                    }
                }
            }
        }
        return moves; 
    }
}