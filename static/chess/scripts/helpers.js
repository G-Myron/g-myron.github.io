
// Default initial state if not saved
// Returns object of structure (piece_id: square_id,..}
function calcInitState(state={}) {
    for (let p=0; p<32; p++) {
        sq = p<16? p : p+32;
        state[PIECES[p].id] = SQUARES[sq].id;
    };
    return state;
}


function getState() {
    // Position of each piece, previously promoted pieces, and who's turn is it.
    let state = {"playersTurn":playersTurn, "pieces":{}, "promoted":promotedPieces};

    PIECES.forEach( piece => {
        let sq = piece.square;
        state.pieces[piece.id] = sq===null? null: sq.id;
    });
    return state
}

//Save game's state. Called in makeMove each time a player makes a move
function saveState() {
    let state = getState();

    localStorage["chessDataInput"] = JSON.stringify(state);

    // Pass parameter with Post request
    fetch('/chess', {method:'POST', body: JSON.stringify(state)});
}
// Save state periodicaly
// setInterval(savePositions, 10_000); // every 10s

function clearSavedState() {
    localStorage.removeItem("chessDataInput");
    fetch('/chess', {method:'POST', body: '{}'});
}

