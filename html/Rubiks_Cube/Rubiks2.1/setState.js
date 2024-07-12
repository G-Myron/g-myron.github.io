
// Now, instead of states (since that approach was wrong), I will use moves.
// So x0,x1,X0,X1, and similar for y and z.

var moves = [];

input.addEventListener("keypress", (e) => {
    if (e.key !== 'Enter') return;
    let move = input.value;
    if ( !"xyzXYZ".includes(move[0]) ) return;

    if (move.length === 1) move += '0';

    moves.push(move);
    setState();
});

// This is the matrix of the colors on the cubde's sides.
let cubeMatrix = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [2, 2, 2, 2],
    [3, 3, 3, 3],
    [4, 4, 4, 4],
    [5, 5, 5, 5]
];


setState();

function setState() {

    cubeMatrix = [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [2, 2, 2, 2],
        [3, 3, 3, 3],
        [4, 4, 4, 4],
        [5, 5, 5, 5]
    ];
    

    for (let move of moves) {
        let repetitions = move === move.toUpperCase()? 3 : 1;
        let dict = {
            "x0" : Transforms.x0Transform,
            "x1" : Transforms.x1Transform,
            "y0" : Transforms.y0Transform,
            "y1" : Transforms.y1Transform,
            "z0" : Transforms.z0Transform,
            "z1" : Transforms.z1Transform,
        }

        move = move.toLowerCase();

        for (let i=0; i<repetitions; i++)
            dict[move]();
    }

    drawCube(cubeMatrix);
}


