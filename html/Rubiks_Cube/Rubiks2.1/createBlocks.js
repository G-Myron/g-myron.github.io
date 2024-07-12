
function drawCube(colorsMatrix) {
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

    let forntface = document.createElement("div");
    forntface.className = "blockface " + sides[0] +" "+ color;
    block.append(forntface);
    
    // let leftface = document.createElement("div");
    // leftface.className = "blockface left inside";
    // block.append(leftface);
    
    let backface = document.createElement("div");
    backface.className = "blockface back";
    block.append(backface);

    return block;
}



