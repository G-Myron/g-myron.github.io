
// A 2*2*2 Rubics cube contains information of 6 bits. Generally a k*m*n has 2*(k+n+m-3)
BITS = 6;
var state = "0".repeat(BITS);
const input = document.querySelector("input");


document.querySelector("input").addEventListener("change", ()=> {
    state = input.value;
    setState();
});


setState();


function setState(customState) {
    if (customState) state = customState;

    let zRotations = parseInt(state.slice(4,6), 2);
    let yRotations = parseInt(state.slice(2,4), 2);
    let xRotations = parseInt(state.slice(0,2), 2);

    const cList = [ // Colors List
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [2, 2, 2, 2],
        [3, 3, 3, 3],
        [4, 4, 4, 4],
        [5, 5, 5, 5]
    ];

    let tempColor = [];
    
    // ROTATIONS AROUND THE (-Z) AXIS
    let zTransform = () => {
        tempColor = [cList[0][2], cList[0][3]];
        [cList[0][2], cList[0][3]] = [cList[2][2], cList[2][3]];
        [cList[2][2], cList[2][3]] = [cList[1][2], cList[1][3]];
        [cList[1][2], cList[1][3]] = [cList[3][2], cList[3][3]];
        [cList[3][2], cList[3][3]] = tempColor;
        [cList[5][0], cList[5][1], cList[5][2], cList[5][3]] =
        [cList[5][1], cList[5][3], cList[5][0], cList[5][2]];
    }
    for (let i = 0; i < zRotations; i++)
        zTransform();

    // ROTATIONS AROUND THE (X) AXIS
    let xTransform = () => {
        tempColor = [cList[0][1], cList[0][3]];
        [cList[0][1], cList[0][3]] = [cList[4][1], cList[4][3]];
        [cList[4][1], cList[4][3]] = [cList[1][2], cList[1][0]];
        [cList[1][2], cList[1][0]] = [cList[5][1], cList[5][3]];
        [cList[5][1], cList[5][3]] = tempColor;
        [cList[2][0], cList[2][1], cList[2][2], cList[2][3]] =
        [cList[2][1], cList[2][3], cList[2][0], cList[2][2]];
    }
    for (let i = 0; i < xRotations; i++)
        xTransform();

    // ROTATIONS AROUND THE (-Y) AXIS
    let yTransform = () => {
        tempColor = [cList[4][0], cList[4][1]];
        [cList[4][0], cList[4][1]] = [cList[3][2], cList[3][0]];
        [cList[3][2], cList[3][0]] = [cList[5][3], cList[5][2]];
        [cList[5][3], cList[5][2]] = [cList[2][1], cList[2][3]];
        [cList[2][1], cList[2][3]] = tempColor;
        [cList[1][0], cList[1][1], cList[1][2], cList[1][3]] =
        [cList[1][1], cList[1][3], cList[1][0], cList[1][2]];
    }
    for (let i = 0; i < yRotations; i++)
        yTransform();


    setupCube(cList);
}


