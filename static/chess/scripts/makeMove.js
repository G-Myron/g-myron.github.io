function makeMove(piece) { // Called in initialization
    var startPos = [];
    var square = null;
    piece.onmousedown = piece.ontouchstart = (event)=> {
        if(playersTurn != piece.color) return;
        onClick(event);
        document.onmousemove = piece.ontouchmove = onMove;
        document.onmouseup = piece.ontouchend = onMouseUp;
    }


    function onClick(e) {
        e.preventDefault();
        if(e.type==='touchstart') e = e.changedTouches[0];  // Touch screen

        lift(piece, e);
        square = piece.square;
        startPos = [piece.style.left, piece.style.top];
        [posX, posY] = [e.clientX, e.clientY];

        // console.log(piece);
        console.log(document.querySelectorAll(".threatened"));
        piece.movesAllowed = piece.findMoves();
        showMoves(piece.movesAllowed);
    }

    function onMove(e) {
        e.preventDefault();
        if(e.type==='touchmove') e = e.changedTouches[0];   // Touch screen

        // Move piece to follow mouse
        [dy, dx] = [posY - e.clientY, posX - e.clientX];
        piece.style.top = Number.parseFloat(piece.style.top) - dy + "px";
        piece.style.left = Number.parseFloat(piece.style.left) - dx + "px";
        [posX, posY] = [e.clientX, e.clientY];
    }

    function onMouseUp() {
        document.onmouseup = document.onmousemove = piece.ontouchmove = piece.ontouchend = null;
        piece.square = findPieceSquare(piece);

        // If piece was not placed, return in previous position
        if(!putPieceOnSquare(piece, square)) {
            [piece.style.left, piece.style.top] = startPos;
            piece.square = findPieceSquare(piece);
            putPieceOnSquare(piece, square);
        }

        // If piece has changed square and we're not during pawn promotion
        if( piece.square != square && !pawnPromotion ) {
            finishMove(piece);
        }

        // TODO: Optimize
        else {
            hideAllMoves();
            checkKings();
        }
    }
    
    
    function lift(elmt, event) {
        old = document.querySelector(".lifted");
        if(old) old.classList.toggle("lifted");
        elmt.classList.toggle("lifted");
        let currentSquare = findSquare(event.clientX, event.clientY);
        if(currentSquare) currentSquare.piece = null;
    }
}

function finishMove(piece) {
    piece.moved = true;
    playersTurn = {"white":"black", "black":"white"}[playersTurn]   // Change the player that plays next
    saveState();
    hideAllMoves();
    checkKings();
}

