const BOARD = document.querySelector('.board');
const PIECES = document.querySelectorAll('.piece');
const WHITES = document.querySelectorAll('.piece.white');
const BLACKS = document.querySelectorAll('.piece.black');

const SQUARES = []; // Create list of squares sorted by id number
document.querySelectorAll(".square").forEach( sq=> {
    id = Number(sq.id.replace('sq',''));
    SQUARES[id] = sq;
});


function initializePieces() { // Called only from mainScript on load
    PIECES.forEach( (piece) => {
        piece.color = piece.classList[1];
        piece.type = piece.classList[2];
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

        // For safety.. If you are sure delete it!
        piece.square = findPieceSquare(piece);
    });

    SQUARES.forEach( (square)=> {
        square.num = Number(square.id.replace("sq", "")); // Get square's number
        square.row =  Number.parseInt(square.num/8);
        square.column = square.num%8;
    })

    // findAllPiecesMoves(); // Old code
}

