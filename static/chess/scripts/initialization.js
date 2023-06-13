const BOARD = document.querySelector('.board');
const PIECES = document.querySelectorAll('.piece');
const WHITES = document.querySelectorAll('.piece.white');
const BLACKS = document.querySelectorAll('.piece.black');

// Create Board
// for(i=0; i<8; i++){
//     let row = document.createElement('tr');
//     for(j=0; j<8; j++){
//         let k = i%2? j: 7-j;    // To be colored and numbered corectly
//         let square = document.createElement('td');
//         square.classList.add('square');
//         square.id = "sq" + (i*8 + k);
//         row.appendChild(square);
//     }
//     BOARD.lastElementChild.appendChild(row); // append to tbody
// }

const SQUARES = []; // Create list of squares sorted by id number
document.querySelectorAll(".square").forEach( sq=> {
    id = Number(sq.id.replace('sq',''));
    SQUARES[id] = sq;
});


function initializePieces() {
    PIECES.forEach((piece)=> {
        piece.color = piece.classList[1];
        piece.moved = false;
        piece.square = document.querySelector(`#${initialState[piece.id]}`);

        // Set event-listeners for the piece
        makeMove(piece);

        // Place it on the right square
        putPieceOnSquare(piece);
        if (promotedPieces[piece.id] != undefined)
            promotePawn(piece, promotedPieces[piece.id]);

        piece.square = findPieceSquare(piece);  // For safety.. If you are sure delete it!
    });

    SQUARES.forEach( (square)=> {
        square.num = Number(square.id.replace("sq", "")); // Get square's number
        square.row =  Number.parseInt(square.num/8);
        square.column = square.num%8;
    })

    findAllPiecesMoves();
}

