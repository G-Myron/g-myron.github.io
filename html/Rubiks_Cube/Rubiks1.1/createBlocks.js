
faces[0].append(createCornerBlock( "top left",       ["front", "top", "left"],      ["red","white","green"] ));
faces[0].append(createCornerBlock( "top right",      ["front", "top", "right"],     ["red","white","blue"] ));
faces[0].append(createCornerBlock( "bottom left",    ["front", "bottom", "left"],   ["red","yellow","green"] ));
faces[0].append(createCornerBlock( "bottom right",   ["front", "bottom", "right"],  ["red","yellow","blue"] ));

faces[1].append(createCornerBlock( "top left",       ["front", "top", "left"],      ["orange","white","blue"] ));
faces[1].append(createCornerBlock( "top right",      ["front", "top", "right"],     ["orange","white","green"] ));
faces[1].append(createCornerBlock( "bottom left",    ["front", "bottom", "left"],   ["orange","yellow","blue"] ));
faces[1].append(createCornerBlock( "bottom right",   ["front", "bottom", "right"],  ["orange","yellow","green"] ));



function createCornerBlock(orient, sides, colors){
    let block = document.createElement("div");
    block.className = "block " + orient;

    let blockface1 = document.createElement("div");
    blockface1.className = "blockface " + sides[0] +" "+ colors[0];
    block.append(blockface1);
    let blockface2 = document.createElement("div");
    blockface2.className = "blockface " + sides[1] +" "+ colors[1];
    block.append(blockface2);
    let blockface3 = document.createElement("div");
    blockface3.className = "blockface " + sides[2] +" "+ colors[2];
    block.append(blockface3);
    let backface = document.createElement("div");
    backface.className = "blockface back";
    block.append(backface);

    return block;
}



