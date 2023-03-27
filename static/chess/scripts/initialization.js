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

//------------------ Functions -----------------------

function initializePieces() {
    PIECES.forEach((piece,i)=> {
        // console.log( piece.id, initialState[piece.id]);
        piece.color = piece.classList[1];
        // piece.square = ()=> findPieceSquare(piece);
        piece.square = document.querySelector(`#${initialState[piece.id]}`);
        piece.moved = false;

        makeMove(piece); // Set event-listeners for the piece
        placePieces(piece,i, boardLeft, boardTop);
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

function placePieces(piece,i, boardLeft, boardTop) {
    // if (piece.square == null) {
    //     piece.style.left = boardLeft + i%8*squareSize + "px";
    //     piece.style.top = boardTop + (Math.floor(i/8) + 4*Math.floor(i/16) +.5)*squareSize + "px";
    //     piece.square = findPieceSquare(piece);
    // }
    
    // piece.setAttribute('style',`left:${boardLeft + i%8*squareSize}px;
    //     top:${boardTop + (Math.floor(i/8) + 4*Math.floor(i/16) +.5)*squareSize}px`);

    putPieceOnSquare(piece);
}

