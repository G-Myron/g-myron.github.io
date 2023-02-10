
// Set functions isThreatened and isnotThreatened for pieces
PIECES.forEach( (piece)=> {
    piece.isThreatened = ()=> /*piece.square*/ findPieceSquare(piece).isThreatened();
    piece.isnotThreatened = ()=> /*piece.square*/ findPieceSquare(piece).isnotThreatened();
})

// Set functions isThreatened and isnotThreatened for squares
SQUARES.forEach( (square)=> {
    square.isThreatened = function(color="") {  // Array
        let opponents, threateners=[], wasEmpty=false;

        if(square.piece === null) {
            wasEmpty=true;
            square.piece = color==='black'? BLACKS[0] :
                        color==='white'? WHITES[0] : null;
            opponents = color==='black'? WHITES :
                        color==='white'? BLACKS : PIECES;
        }
        else if(square.piece.color === "black") opponents = WHITES;
        else if(square.piece.color === "white") opponents = BLACKS;

        opponents.forEach( (piece)=> {
            if(!piece.id.includes('king')   // Checking for Roke creates infinite loop
                && piece.findMoves().includes(square))
                threateners.push(piece);
        });
        
        if(wasEmpty) square.piece = null;
        return threateners;
    }
    
    // Boolean
    square.isnotThreatened = (color="") => square.isThreatened(color).length === 0;
})


