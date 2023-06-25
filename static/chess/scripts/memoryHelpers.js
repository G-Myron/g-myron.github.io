
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
        state.pieces[piece.id] = sq? sq.id : null;
    });
    return state
}

//Save game's state. Called in makeMove each time a player makes a move
function saveState() {
    let state = getState();

    // Pass parameter from JS and with Post request
    localStorage["chessDataInput"] = JSON.stringify(state);
    fetch('/chess', {method:'POST', body: JSON.stringify(state)});
}
// Save state periodicaly
// setInterval(savePositions, 10_000); // every 10s

async function clearSavedState() {
    // Not sure about correct use of await
    await localStorage.removeItem("chessDataInput");
    await fetch('/chess', {method:'POST', body: '{}'});
}

async function restartGame() {
    console.log("Clearing saved states...");
    await clearSavedState();
    console.log("Reloading page");
    location.reload();
}

