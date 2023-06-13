
function findSquare(x,y) { // Returns the square that contains these coordinates
    for(let square of SQUARES) {
        let squarePos = square.getBoundingClientRect();
        if (squarePos.left < x && x < squarePos.right &&
            squarePos.top < y && y < squarePos.bottom)
            return square;
    }
    return null;
}
function findPieceSquare(piece) { // Returns the square that contains this piece
    let piecePos = piece.getBoundingClientRect();
    let pieceLeft = piecePos.left + squareSize/2;
    let pieceTop = piecePos.top + squareSize/2;
    return findSquare(pieceLeft, pieceTop); // The square that has that piece
}

function eatPiece(piece) {
    // If king is eaten, game ends
    if(piece.classList.contains("king"))
        endGame(piece.color);
    
    let n = document.querySelectorAll(`.${piece.color}.eaten`).length; // How many of this color are eaten
    let side = piece.color=="black"? BOARD.getBoundingClientRect().width : -squareSize; // Pick side to send the piece

    // Eat the piece and send it out of the board
    piece.style.left = boardLeft + side +'px';
    piece.style.top = boardTop + n*squareSize +'px';
    piece.classList.add("eaten");
    if (piece.square) piece.square.piece = null;
    piece.square = null;
}

function centerInSquare(square, piece) {
    piece.style.left = square.getBoundingClientRect().left +'px';
    piece.style.top = square.getBoundingClientRect().top +'px';
    square.piece = piece;
    if(piece.classList.contains("pawn") && (square.row<1 || square.row>6))
        pawnPromotion(piece);    // If a pawn reaches the end it promotes
}


// Place piece to piece.square
function putPieceOnSquare(piece, oldSquare=null) { // returns false if piece was not placed
    let square = piece.square;

    // Outside of board because eaten (or falsly moved? TODO)
    if(!square) {
        // console.log(piece.classList);
        eatPiece(piece);
        return false;
    }

    let sqDiff = oldSquare? square.num-oldSquare.num : NaN;

    // Check if this move is allowed
    if(piece.movesAllowed && ! piece.movesAllowed.includes(square)) {
        return false;
    }
    
    // Roke-Castling
    if( !piece.moved && piece.classList.contains("king") && oldSquare) {
        castling(piece, sqDiff);
    }

    // En passant
    if(enPassant==piece && pawnDoubleMove) { // En-Passant
        let enPSquare = findPieceSquare(pawnDoubleMove);
        let enPDiff = Math.abs(enPSquare.num-square.num);
        if(enPDiff==8) eatPiece(enPSquare.piece, enPSquare.piece.color);
    }
    if(sqDiff!=0) pawnDoubleMove=enPassant = null;    // Initialize en-passant global variables
    if(!piece.moved && piece.classList.contains("pawn") && oldSquare) { // Check if pawn made double start for en-passant
        if(Math.abs(sqDiff)==16) pawnDoubleMove=piece;
    }

    // Square is occupied by opponent
    if(square.piece && square.piece.color!=piece.color) {
        eatPiece(square.piece, square.piece.color);
    }

    // Square is empty and availiable
    if(!square.piece) {
        centerInSquare(square, piece);
        return true;
    }

    return false;
}

