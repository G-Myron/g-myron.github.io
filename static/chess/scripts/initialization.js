function initializePieces() { // Called only from mainScript on load
    PIECES.forEach( (piece) => {
        [_, piece.color, piece.type] = piece.classList;
        piece.moved = false;
        piece.square = document.querySelector(`#${initialState[piece.id]}`);

        // Set event-listeners for the piece
        makeMove(piece);

        // Set function to find allowed moves
        findPieceMoves(piece);

        // Place it on the right square
        putPieceOnSquare(piece);
        if (promotedPieces[piece.id] != undefined)
            promotePawn(piece, promotedPieces[piece.id]);
    });

    SQUARES.forEach( (square)=> {
        square.num = Number(square.id.replace("sq", "")); // Get square's number
        square.row =  Number.parseInt(square.num/8);
        square.column = square.num%8;
    })
}

