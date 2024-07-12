
function setupCube(colorsMatrix) {
    faces.forEach( (face, i) => {
        face.replaceChildren();
        face.append(createBlock( ["front", "top", "left"],      COLORS[colorsMatrix[i][0]] ));
        face.append(createBlock( ["front", "top", "right"],     COLORS[colorsMatrix[i][1]] ));
        face.append(createBlock( ["front", "bottom", "left"],   COLORS[colorsMatrix[i][2]] ));
        face.append(createBlock( ["front", "bottom", "right"],  COLORS[colorsMatrix[i][3]] ));
    })
}

function createBlock(sides, color){
    let block = document.createElement("div");
    block.className = `block ${sides[1]} ${sides[2]}`;

    let blockface = document.createElement("div");
    blockface.className = "blockface " + sides[0] +" "+ color;
    block.append(blockface);

    return block;
}



