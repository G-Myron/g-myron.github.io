// TODO: Categorize these constants..

const staticPath = "static/chess"; // JINJA
const playerColor = "white" //prompt("Choose a color:"); // TODO: Future implementation

const BOARD = document.querySelector('.board');
const PIECES = document.querySelectorAll('.piece');
const WHITES = document.querySelectorAll('.piece.white');
const BLACKS = document.querySelectorAll('.piece.black');

// Create list of squares sorted by id number
const SQUARES = Array.from(BOARD.querySelectorAll(".square"));
SQUARES.sort( (a,b) => {
    if (playerColor === 'black') [a,b] = [b,a];
    return a.id.substring(2) - b.id.substring(2);
});

const squareSize = Number.parseFloat(getComputedStyle(SQUARES[0]).height);
var boardTop = BOARD.offsetTop;
var boardLeft = BOARD.offsetLeft;
var gameEnded = false;  // store to memory;
var playersTurn = "playersTurn" in dataInput? dataInput["playersTurn"] : "white";
const initialState = "pieces" in dataInput? dataInput["pieces"] : calcInitState();
var promotedPieces = "promoted" in dataInput? dataInput["promoted"] : {};


//------------------------- MAIN --------------------------------
window.onload = ()=> {
    [boardTop, boardLeft] = [BOARD.offsetTop, BOARD.offsetLeft];
    initializePieces();
};


window.onresize = ()=> {
    [boardTopOld, boardLeftOld] = [boardTop, boardLeft];
    [boardTop, boardLeft] = [BOARD.offsetTop, BOARD.offsetLeft];

    PIECES.forEach((piece)=>{
        piece.style.top =  Number.parseFloat(piece.style.top) + boardTop - boardTopOld + "px";
        piece.style.left = Number.parseFloat(piece.style.left) + boardLeft - boardLeftOld + "px";
        // centerInSquare(piece);
    });
};



