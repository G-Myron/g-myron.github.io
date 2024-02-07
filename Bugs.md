## CHESS:

### Remember in any change of the code to update the chess-README.md fie (in draft folder).

1. All TODOs in comments
2. Frontend design (e.g. Organize the placing of eaten pieces)

3. initializePieces(): work with null values and eaten pieces, work with initial value if session is empty.
4. For check idea:
    On check, mark also the squares between, so it'll be easy to allow only moves from the defentee that are on these.
    Think also how the matt is going to be detected.
    Also:
        don't move king in a threatened square
        don't move a pinned piece

5. Global variables etc. eg. findMovesPiece
6. isThreatened? When should it be called? If opponent plays?

7. Optimize structure so state can be easily saved!!!
8. Save piece.moved - Or better not use it at all, find a better way

9. Castling: save in memory (see photo)
10. Check king: Manage when the squares turn red

11. Possible problems: Changed `let` to `const` in many places..

12. When checked don't allow unrelated moves


