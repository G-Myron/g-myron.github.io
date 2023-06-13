var promotionPawn, promotionBoard, pawnDoubleMove=null, enPassant=null;

/* GAME TERMINATION */

function endGame(color) {
    color = {"white":"black", "black":"white"}[color]; //color=="white"? "black":"white";
    const winnerMsg = color+" wins!";
    const winnerBox = document.querySelector("#winnerCard");
    winnerBox.querySelector(".winner-msg").innerHTML = winnerMsg.toUpperCase();
    winnerBox.classList.toggle("visible-flex");
    gameEnded = true;
    clearSavedState();
}

/* CHECK - ROUA */

function checkKings() {
    const king = playersTurn=='white'? document.querySelector("#w-king"): document.querySelector("#b-king");
    const threatened = document.querySelectorAll(".threatened")

    // Document it.. Probably has problems too

    if( !king.isnotThreatened() ) {
        createThreatened(king);
        king.isThreatened().forEach( piece=> createThreatened(piece));
    }
    else if(threatened) threatened.forEach( p=> p.remove());

    function createThreatened(piece) {  // Creates fake piece to see if it would be threatened in that position
        let sq = findPieceSquare(piece), childSq = document.createElement('div');
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
    findPieceMoves(promotionPawn, pieceName);
    promotionBoard.classList.toggle("visible-flex");
    saveState();
}


/* CASTLING - ROKE */

function castling(king, sqDiff) {
    // If king moved 2 squares (instead of 1), move rook
    if(sqDiff==2 || sqDiff==-2) {
        const rook = document.querySelectorAll(".rook."+ king.color)[(sqDiff+2)/4]; // rooks[0/1]
        const rookSq = document.querySelector("#sq"+(king.square.num - sqDiff/2)) // id+-1
        findPieceSquare(rook).piece = null;
        centerInSquare(rookSq, rook);
        rook.square = rookSq;
    }
}


