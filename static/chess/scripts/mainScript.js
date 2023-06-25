const staticPath = "static/chess"; // JINJA
const playerColor = "white" //prompt("Choose a color:"); // TODO: Future implementation

// DOM Elements
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

const whiteKing = document.querySelector(".white.king")
const blackKing = document.querySelector(".black.king")

const squareSize = Number.parseFloat(getComputedStyle(SQUARES[0]).height);
var boardTop = BOARD.offsetTop;
var boardLeft = BOARD.offsetLeft;
const initialState = "pieces" in dataInput? dataInput["pieces"] : calcInitState();
var playersTurn = "playersTurn" in dataInput? dataInput["playersTurn"] : "white";
var promotedPieces = "promoted" in dataInput? dataInput["promoted"] : {};

var pawnDoubleMove=null, enPassant=null;
var pawnPromotion=false; // true only while the promotion tab is open
var promotionPawn, promotionBoard; // Used only in gameRules



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



