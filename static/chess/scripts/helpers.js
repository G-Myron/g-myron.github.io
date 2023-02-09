
//Save game's state. Called in makeMove each time a player makes a move
function saveState() {
    // Position of each piece and who's turn is it. Pass parameter with Post request

    let state = {"playersTurn":playersTurn, "pieces":{}};
    document.querySelectorAll('.piece').forEach( p => {
        let sq = p.square()
        state.pieces[p.id] = sq===null? sq: sq.id
    });
    fetch('/chess', {method:'POST', body: JSON.stringify(state)});
}
// Save state periodicaly
// setInterval(savePositions, 10_000); // every 10s

