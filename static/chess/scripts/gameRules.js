var promotionPawn, promotionBoard, pawnDoubleMove=null, enPassant=null;

/* GAME TERMINATION */

function endGame(color) {
    color = color=="white"? "black":"white";
    let winnerMsg = color+" wins!";
    let winnerBox = document.querySelector("#winnerCard");
    winnerBox.querySelector(".winner-msg").innerHTML = winnerMsg.toUpperCase();
    winnerBox.classList.toggle("visible-flex");
    gameEnded = true;
    clearSavedState();
}

/* CHECK - ROUA */

function checkKings() {
    let king = playersTurn=='white'? document.querySelector("#w-king"): document.querySelector("#b-king");
    let threatened = document.querySelectorAll(".threatened")
    if(!king.isnotThreatened()) {
        createThreatened(king);
        king.isThreatened().forEach( piece=> createThreatened(piece));
    }
    else if(threatened) threatened.forEach( p=> p.remove());

    function createThreatened(piece) {  // Creates fake piece to see if it would be threatened in that position
        let sq = findPieceSquare(piece) /*piece.square*/, childSq = document.createElement('div');
        if(sq.querySelector('.threatened')!=null) return; // Already marked

        childSq.classList.add('threatened');
        sq.appendChild(childSq);
    }
}


/* PAWN PROMOTION */

function pawnPromotion(pawn) {  // Open the options to chose
    promotionBoard = document.querySelector("#"+pawn.color+"-promotion");
    promotionBoard.classList.toggle("visible-flex");
    promotionPawn = pawn;
}

function promotePawn(pawn, pieceName) {
    pawn.classList.replace("pawn", pieceName);
    pawn.src = staticPath+'/pieces/'+pawn.color[0]+'-'+pieceName+".png";
    promotedPieces[pawn.id] = pieceName;
}

function pawnPromote(pieceName="queen") {  // Choose from the options
    promotePawn(promotionPawn, pieceName);
    findMovesPiece(promotionPawn, pieceName);
    promotionBoard.classList.toggle("visible-flex");
    saveState();
}


/* CASTLING - ROKE */

function castling(king, sqDiff) {
    if(sqDiff==2 || sqDiff==-2) {
        let rook = document.querySelectorAll(".rook."+ king.color)[(sqDiff+2)/4]; // rooks[0/1]
        let rookSq = document.querySelector("#sq"+(king.square.num - sqDiff/2)) // id+-1
        findPieceSquare(rook).piece = null; //rook.square.piece = null;
        centerInSquare(rookSq, rook);
        rook.square = rookSq;
    }
}


