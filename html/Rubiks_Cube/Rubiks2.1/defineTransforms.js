
class Transforms {
    static tempColor = [];

    static replaceElements( old_row=null, old_elements=[], new_row=null, new_elements=[] ) {
        if (old_row === null)
            this.tempColor =
            [cubeMatrix[new_row][new_elements[0]], cubeMatrix[new_row][new_elements[1]]];
        else if (new_row === null)
            [cubeMatrix[old_row][old_elements[0]], cubeMatrix[old_row][old_elements[1]]] =
            this.tempColor;
        else
            [cubeMatrix[old_row][old_elements[0]], cubeMatrix[old_row][old_elements[1]]] =
            [cubeMatrix[new_row][new_elements[0]], cubeMatrix[new_row][new_elements[1]]];
    }

    static rotateRow(row, clockwise=true) {
        if (clockwise)
            [cubeMatrix[row][0], cubeMatrix[row][1], cubeMatrix[row][2], cubeMatrix[row][3]] =
            [cubeMatrix[row][1], cubeMatrix[row][3], cubeMatrix[row][0], cubeMatrix[row][2]];
        else
            [cubeMatrix[row][1], cubeMatrix[row][3], cubeMatrix[row][0], cubeMatrix[row][2]] =
            [cubeMatrix[row][0], cubeMatrix[row][1], cubeMatrix[row][2], cubeMatrix[row][3]];
    }


    // ROTATE TOP SIDE AROUND THE (-Z) AXIS
    static z0Transform = () => {
        // this.transform([0,1,2,3,4])
        this.replaceElements(null, [], 0, [0,1]);
        this.replaceElements(0, [0,1], 2, [0,1]);
        this.replaceElements(2, [0,1], 1, [0,1]);
        this.replaceElements(1, [0,1], 3, [0,1]);
        this.replaceElements(3, [0,1], null);
        
        this.rotateRow(4, false);
    }
    // ROTATE BOTTOM SIDE AROUND THE (-Z) AXIS
    static z1Transform = () => {
        this.replaceElements(null, [], 0, [2,3]);
        this.replaceElements(0, [2,3], 2, [2,3]);
        this.replaceElements(2, [2,3], 1, [2,3]);
        this.replaceElements(1, [2,3], 3, [2,3]);
        this.replaceElements(3, [2,3], null);
        
        this.rotateRow(5, true);
    }


    // ROTATE RIGHT SIDE AROUND THE (-X) AXIS
    static x0Transform = () => {
        this.replaceElements(null, [], 0, [1,3]);
        this.replaceElements(0, [1,3], 5, [1,3]);
        this.replaceElements(5, [1,3], 1, [2,0]);
        this.replaceElements(1, [2,0], 4, [1,3]);
        this.replaceElements(4, [1,3], null);
        
        this.rotateRow(2, false);
    }
    // ROTATE LEFT SIDE AROUND THE (-X) AXIS
    static x1Transform = () => {
        this.replaceElements(null, [], 0, [0,2]);
        this.replaceElements(0, [0,2], 5, [0,2]);
        this.replaceElements(5, [0,2], 1, [3,1]);
        this.replaceElements(1, [3,1], 4, [0,2]);
        this.replaceElements(4, [0,2], null);
        
        this.rotateRow(3, true);
    }


    // ROTATE FRONT SIDE AROUND THE (-Y) AXIS
    static y0Transform = () => {
        this.replaceElements(null, [], 4, [2,3]);
        this.replaceElements(4, [2,3], 2, [0,2]);
        this.replaceElements(2, [0,2], 5, [1,0]);
        this.replaceElements(5, [1,0], 3, [3,1]);
        this.replaceElements(3, [3,1], null);
        
        this.rotateRow(0, true);
    }
    // ROTATE BACK SIDE AROUND THE (-Y) AXIS
    static y1Transform = () => {
        this.replaceElements(null, [], 4, [0,1]);
        this.replaceElements(4, [0,1], 2, [1,3]);
        this.replaceElements(2, [1,3], 5, [3,2]);
        this.replaceElements(5, [3,2], 3, [2,0]);
        this.replaceElements(3, [2,0], null);
        
        this.rotateRow(1, false);
    }
}

