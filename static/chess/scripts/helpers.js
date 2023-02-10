
// Default initial state if not saved in session
function calcInitState(state={}) {
    for (let p=0; p<32; p++) {
        sq = p<16? p : p+32;
        state[PIECES[p].id] = SQUARES[sq].id;
    };
    return state;
}


//Save game's state. Called in makeMove each time a player makes a move
function saveState() {
    // Position of each piece and who's turn is it. Pass parameter with Post request

    let state = {"playersTurn":playersTurn, "pieces":{}};
    PIECES.forEach( p => {
        let sq = p.square;
        state.pieces[p.id] = sq===null? sq: sq.id;
    });
    localStorage["chessDataInput"] = JSON.stringify(state);
    fetch('/chess', {method:'POST', body: JSON.stringify(state)});
}
// Save state periodicaly
// setInterval(savePositions, 10_000); // every 10s

function clearSavedState() {
    localStorage.removeItem("chessDataInput");
    fetch('/chess', {method:'POST', body: '{}'});
}

