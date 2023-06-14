## CHESS:

### Remember in any change of the code to update the chess-README.md fie (in draft folder).

- 1. piece.square was replaced by findPieceSquare(piece): Remove all the comments.

- 2. pwan promotion: After save and restore from session it becomes pawn again.

3. initializePieces(): work with null values and eaten pieces, work with initial value if session is empty.

- 4. gameEnd(): Optimize it & if the saved session is a finished game will it be called?
- 5. Pawn promotion after reload
- 6. isnotThreatened: Throws error when game ends.

7. checkKings()

8. Global variables etc. eg. findMovesPiece
9. isThreatened? When should it be called? If opponent plays?

10. Optimize structure so state can be easily saved! !!!
11. Save piece.moved - Or better not use it at all, find a better way
12. Organize the placing of eaten pieces

13. Castling: save in memory (see photo)

14. Check putPieceOnSquare if(!square) for the case piece is moved by the user outside of the board:
    If you move a king out of board game ends.

15. Possible problems: Changed `let` to `const` in many places..
16. Frontend
17. All TODOs in comments

