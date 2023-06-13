
## General Intuition of how the program works:



---

**app.py:**
The function chess().

**Bugs.md:**
The solved bugs are proceeded by "-".

- ### *templates*:
    **chess.html:**
    The only HTML file.

**static/chess/chess-style.css:**
The only CSS file.

- ### *static/chess/scripts*:
    **mainScript.js:**
    - *globally*

        Define constants,
        On load call `initializePieces`.

    **initializeThreatened.js**
    - *globally*

        Define methods isThreatened and isnotThreatened for each piece and square.

    **initialization.js**
    - `initializePieces`
    
        For each piece set attributes, set event listeners, and place it on its square.
        For each square set attributes.
        Call `findAllPiecesMoves`.

    **makeMove.js**
    - `makeMove`

        Set the listeners of the mouse events for any piece.

    **placePieces.js**
    - `findSquare`, `findPieceSquare`

        Find which square contains a point or a piece.

    - `eatPiece`, `centerInSquare`

        Eat the piece and place it outside of the board.
        Place piece in the center of the square.

    - `putPieceOnSquare`

        Place the piece:
        - If has been eaten, call `eatPiece`
        - If it's king, call `castling`
        - Check for en passant
        - If there's opponent, eat him
        - If after all that the square is free and allowed, place it
        - If wasn't able to move, return false

    **findMoves.js**
    - `findAllPiecesMoves`

        For all pieces, define the findMoves method, which will return a list of all the allowed moves for the piece.

    - `findMovesRook`, `findMovesHorse`, `findMovesBishop`, `findMovesPawn`, `findMovesQueen`, `findMovesKing`

        Specific functions to find the allowed moves for each type of piece, used only by `findAllPiecesMoves`.

    - `isEmptySq`, `showMoves`, `hideAllMoves`

        Helpers used in this file or makeMove.js.

    **gameRules.js**
    - `endGame`

        Announce winner and clear memory.

    - `checkKings`

        #### TODO
        Fucked up...

    - `pawnPromotion`, `promotePawn`, `pawnPromote`

        #### TODO
        Improve the names, code, etc

    - `castling`

        Called when you try to move king.
        If moved 2 places, places rook.

    **helpers.js**
    - `calcInitState`

        Used in mainScript.js to find the initial state, if not saved to be retrieved.

    - `getState`

        Helper for `saveState`.

    - `saveState`, `clearSavedState`

        Save or clear saved state.
        Currently use both local storage from JavaScript, and from Python, creating a Post request.

