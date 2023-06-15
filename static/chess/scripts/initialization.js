function initializePieces() { // Called only from mainScript on load
    PIECES.forEach( (piece) => {
        [_, piece.color, piece.type] = piece.classList;
        piece.moved = false; // TODO: get it from memory
        piece.square = document.querySelector(`#${initialState[piece.id]}`);

        // Set event-listeners for the piece
        makeMove(piece);

        // Place it on the right square
        putPieceOnSquare(piece);
        if (promotedPieces[piece.id] != undefined)
            changePromoted(piece, promotedPieces[piece.id]);

        // Set function to find allowed moves
        findPieceMoves(piece);
        
        // Set functions to get the threateners
        piece.getThreats = ()=> findPieceSquare(piece).getThreats(); // returns Array
        piece.isThreatened = ()=> findPieceSquare(piece).isThreatened(); // returns Boolean
    });

    SQUARES.forEach( (square)=> {
        square.num = Number(square.id.replace("sq", "")); // Get square's number
        square.row =  Number.parseInt(square.num/8);
        square.column = square.num%8;
        
        // Set functions to get threateners
        // returns Array
        square.getThreats = function(color="") {
            let opponents, threateners=[], wasEmpty=false;

            if(square.piece === null) {
                wasEmpty=true;
                square.piece = color==='black'? BLACKS[0] :
                            color==='white'? WHITES[0] : null;
                opponents = color==='black'? WHITES :
                            color==='white'? BLACKS : PIECES;
            }
            else if(square.piece.color === "black") opponents = WHITES;
            else if(square.piece.color === "white") opponents = BLACKS;

            opponents.forEach( (piece)=> {
                if( piece.type != 'king'   // Don't check for king threatening o for Roke creates infinite loop
                    && piece.findMoves().includes(square))
                    threateners.push(piece);
            });
            
            if(wasEmpty) square.piece = null;
            
            return threateners;
        }

        // returns Boolean
        square.isThreatened = (color) => square.getThreats(color).length !== 0;
    });
}

