class Board{
    constructor(){

        this.selectedRow = undefined; // Keep track of clicked cells
        this.selectedColumn = undefined; 
        this.possibleMoves = []; // Array which keeps track of all possible moves for selected piece
        this.whiteTurn = true; 
        this.capturedPieces = []; 

        // Initialise 8x8 2D array
        this.grid = new Array(8);
        for(let i = 0; i < 8; i++){
            this.grid[i] = new Array(8);
        }
        this.initialiseGrid(); 
    }

    initialiseGrid(){
        // Pawns
        for(let i = 0; i < this.grid.length; i++){
            this.grid[1][i] = new Pawn(1, i, false, this); 
            this.grid[6][i] = new Pawn(6, i, true, this); 
        }

        // Kings
        this.grid[0][4] = new King(0, 4, false, this); 
        this.grid[7][4] = new King(7, 4, true, this); 

        // Queens
        this.grid[0][3] = new Queen(0, 3, false, this);
        this.grid[7][3] = new Queen(7, 3, true, this); 

        // Rooks
        this.grid[0][0] = new Rook(0, 0, false, this);
        this.grid[0][7] = new Rook(0, 7, false, this);
        this.grid[7][0] = new Rook(7, 0, true, this);
        this.grid[7][7] = new Rook(7, 7, true, this);

        // Knights
        this.grid[0][1] = new Knight(0, 1, false, this);
        this.grid[0][6] = new Knight(0, 6, false, this);
        this.grid[7][1] = new Knight(7, 1, true, this);
        this.grid[7][6] = new Knight(7, 6, true, this);

        // Bishops
        this.grid[0][2] = new Bishop(0, 2, false, this); 
        this.grid[0][5] = new Bishop(0, 5, false, this); 
        this.grid[7][2] = new Bishop(7, 2, true, this); 
        this.grid[7][5] = new Bishop(7, 5, true, this); 
                
    }
    

    show(){
        let squareWidth = width/8; 
        for(let r = 0; r < this.grid.length; r++){
            for(let c = 0; c < this.grid[0].length; c++){

                (r+c) % 2 == 0 ? fill(200) : fill(100); // Change colour each square
                if(this.selectedRow === r && this.selectedColumn === c){
                    fill('rgba(255, 255, 0, 0.6)'); 
                }
                noStroke();
                rect(squareWidth*c, squareWidth*r, squareWidth, squareWidth);

                // If a piece exists on this square, show it
                if(this.grid[r][c] instanceof Piece){
                    this.grid[r][c].show();
                }
            
            }
        }

        for(let i = 0; i < this.possibleMoves.length; i++){
            let r = this.possibleMoves[i][0]; 
            let c = this.possibleMoves[i][1];
            fill(50);
            ellipse(squareWidth*c + squareWidth/2, squareWidth*r + squareWidth/2, 40, 40);
            if(this.grid[r][c] instanceof Piece){
                this.grid[r][c].show();
            }
        }
    }

    occupied(r, c){
        return this.grid[r][c] instanceof Piece 
    }

    inBounds(r, c){
        return r >= 0 && r < 8 && c >= 0 && c < 8
    }

    isValidMove(r, c){
        for(let i = 0; i < board.possibleMoves.length; i++){
            if(r === board.possibleMoves[i][0] && c === board.possibleMoves[i][1]){
                return true; 
            }
        }
        return false;
    }
}