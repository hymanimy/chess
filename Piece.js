class Piece{
    constructor(row, col, isWhite){
        this.row = row; 
        this.col = col; 
        this.isWhite = isWhite; // boolean
        this.firstMove = true; 
    }

    show(symbol){
        let squareWidth = width/8; 
        this.isWhite ? fill(255) : fill(0); 
        textSize(50);
        text(symbol, this.col*squareWidth + squareWidth/4, this.row*squareWidth+ squareWidth/1.5)
    }

    move(r, c){
        // Move current piece to (r,c)  
        board.grid[r][c] = board.grid[this.row][this.col]; // Move piece from current position to new position
        board.grid[this.row][this.col] = undefined; 
        this.row = r; 
        this.col = c;
        this.firstMove = false; 
        board.whiteTurn = !board.whiteTurn; // Reverse the turn 
        console.log(board.whiteTurn ? "White's turn" : "Black's turn")
    }

    capture(r, c){
        board.capturedPieces.push(board.grid[r][c]);
        board.grid[r][c] = undefined; 
        this.move(r, c); 
    }

    checkDirections(dirs){
        let moves = []; 

        // Cycle through all directions the Piece can go and keep check until we hit a blocked square. 
        for(let i = 0; i < dirs.length; i++){
            let j = 1; 
            let newR =  this.row + j * dirs[i][0]; 
            let newC = this.col + j * dirs[i][1]; 
            while(board.inBounds(newR, newC) && !board.occupied(newR, newC)){
                moves.push([newR, newC]);
                j++; 
                newR = this.row + j * dirs[i][0]; 
                newC = this.col + j * dirs[i][1]; 
            }

            // We break the while loop when we run into an occupied cell
            // If this cell is the OPPOSITE colour, then it is still a valid move, despite breaking the line of sight. Add to moves
            if(board.inBounds(newR, newC) && board.grid[newR][newC].isWhite != this.isWhite){
                moves.push([newR, newC]);
            }
        } 

        return moves; 
    }
}