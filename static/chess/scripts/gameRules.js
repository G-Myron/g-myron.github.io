
/* GAME TERMINATION */

function endGame() {
    const winnerMsg = playersTurn+" wins!";
    const winnerBox = document.querySelector("#winnerCard");
    winnerBox.querySelector(".winner-msg").textContent = winnerMsg.toUpperCase();
    winnerBox.classList.toggle("visible-flex");
    // Clear memory
    clearSavedState();
    // Let user hide the winner and see the board
    winnerBox.onclick = () => winnerBox.firstElementChild.style.display = 'none';
}

/* CHECK - ROUA */

function checkKings() {
    let king = playersTurn=='white'? document.querySelector("#w-king"): document.querySelector("#b-king");
    let threatened = document.querySelectorAll(".threatened")

    if( king.isThreatened() ) {
        console.log(king.getThreats());
        createThreatened(king);
        king.getThreats().forEach( piece=> createThreatened(piece));
    }
    else if(threatened) {
        threatened.forEach( p=> p.remove());
    }

    // Creates fake piece to see if it would be threatened in that position
    function createThreatened(piece) {
        let sq = piece.square, childSq = document.createElement('div');
        if( sq.querySelector('.threatened')!=null ) return; // Already marked

        childSq.classList.add('threatened');
        sq.appendChild(childSq);
    }
}


/* PAWN PROMOTION */

function openPromotion(pawn) {  // Open the options to chose
    pawnPromotion = true;
    promotionBoard = document.querySelector("#"+pawn.color+"-promotion");
    promotionBoard.classList.add("visible-flex");
    promotionPawn = pawn;
}

function changePromoted(pawn, pieceName) { // Change the type of the piece from pawn to the selected
    pawn.type = pieceName;
    pawn.classList.replace("pawn", pieceName);
    pawn.src = staticPath+'/pieces/'+pawn.color[0]+'-'+pieceName+".png";
}

function promotePawn(pieceName="queen") {  // Choose from the options - Called from UIs buttons
    promotedPieces[promotionPawn.id] = pieceName;
    changePromoted(promotionPawn, pieceName);
    findPieceMoves(promotionPawn, pieceName);
    promotionBoard.classList.remove("visible-flex");
    finishMove(promotionPawn);
    pawnPromotion = false;
}


/* CASTLING - ROKE */

function castling(king, sqDiff) {
    // If king moved 2 squares (instead of 1), move rook
    if(sqDiff==2 || sqDiff==-2) {
        const rook = document.querySelectorAll(".rook."+ king.color)[(sqDiff+2)/4]; // rooks[0/1]
        const rookSq = document.querySelector("#sq"+(king.square.num - sqDiff/2)) // id+-1
        rook.square.piece = null;
        centerInSquare(rookSq, rook);
        rook.square = rookSq;
    }
}


