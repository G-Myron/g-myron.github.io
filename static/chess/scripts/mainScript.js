const squareSize = Number.parseFloat(getComputedStyle(SQUARES[0]).height);
var boardTop = BOARD.offsetTop;
var boardLeft = BOARD.offsetLeft;
var playersTurn = "playersTurn" in dataInput? dataInput["playersTurn"]:"white";
var initialState = "pieces" in dataInput? dataInput["pieces"]:{};
console.log(dataInput)

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



