let board = new Board(); 

function setup(){
    createCanvas(600, 600);
    background(255);
    board.show();
}

function mouseClicked() {
    // In essence there's four reasons to click:
    // To select your piece and generate moves (first click has not been taken and you click a piece of your colour)
    // to select a new piece and regenerate moves (first click has been taken and you click a piece of your colour)
    // to capture enemy piece (first click has been taken and you click a piece of the opposite colour and its a valid move)
    // or to move a preselected piece (first click has been taken adn you click an empty space which is a valid move)
    let squareWidth = width/8;
    let r = Math.floor(mouseY/squareWidth); // Mouse coordinates converted into row-column positions
    let c = Math.floor(mouseX/squareWidth);

    if(mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height){
        
        // First click, occupied and same colour means we generate moves for our piece
        if(board.selectedRow === undefined && board.occupied(r,c) && board.whiteTurn == board.grid[r][c].isWhite){
            board.selectedRow = r; 
            board.selectedColumn =  c; 
            board.possibleMoves = board.grid[r][c].generateMoves();
        } 
        
        // If its not the first click and the tile is occupied then 
        else if (board.selectedRow != undefined && board.occupied(r,c)){
            
            // If the clicked piece is the same colour as the current turn, then regenerate moves
            if(board.grid[r][c].isWhite == board.whiteTurn){
                board.selectedRow = r; 
                board.selectedColumn =  c; 
                board.possibleMoves = board.grid[r][c].generateMoves();
            } 
            
            else {
                // Otherwise, we have clicked on the opposite colour's piece and we must check whether this is a valid move
                if(board.isValidMove(r, c)){
                    let currentPiece = board.grid[board.selectedRow][board.selectedColumn]
                    currentPiece.capture(r, c);

                    board.selectedRow = undefined; // reset click options
                    board.selectedColumn = undefined; 
                    board.possibleMoves = []; 
                }
            }
        } 
        //If its not the first move and we have selected unoccupied territory, then check if it is a valid move
        else {
            if(board.isValidMove(r, c)){
                let currentPiece = board.grid[board.selectedRow][board.selectedColumn]
                currentPiece.move(r, c);
            }
            board.selectedRow = undefined; 
            board.selectedColumn = undefined; 
            board.possibleMoves = []; 
        }
    }

    board.show(); // Only need to revisualise the board if a click occurs 
}
