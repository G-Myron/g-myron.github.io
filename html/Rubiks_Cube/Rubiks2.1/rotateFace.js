
rotaionsList = [
    `rotateY(0deg) translateZ(${HALF_SIDE}) rotate(0deg)`,
    `rotateY(180deg) translateZ(${HALF_SIDE}) rotate(0deg)`,
    `rotateY(90deg) translateZ(${HALF_SIDE}) rotate(0deg)`,
    `rotateY(-90deg) translateZ(${HALF_SIDE}) rotate(0deg)`,
    `rotateX(90deg) translateZ(${HALF_SIDE}) rotate(0deg)`,
    `rotateX(-90deg) translateZ(${HALF_SIDE}) rotate(0deg)`
]


faces.forEach( (face, iter)=> {
    let x0=0, moving=false, angle=0;

    face.style.transform = rotaionsList[iter];

    //--------------------Event Listeners

    face.addEventListener("mousedown", (event) => faceTouch(event.x));
    document.addEventListener("mousemove", (event) => rotateFace(event.x));
    document.addEventListener("mouseup", endFace);

    face.addEventListener("touchstart", (event) => faceTouch(event.touches[0].clientX) );
    document.addEventListener("touchmove", (event) => rotateFace(event.touches[0].clientX));
    document.addEventListener("touchend", endFace);


    function faceTouch(x) {
        moving = true;
        x0 = x;
    }

    function rotateFace(x, friction = 2) {
        if(!moving) return;
    
        angle =  (x - x0) / friction;
        setAngle(angle);
    }

    function endFace() {
        if(!moving) return;

        let side = face.classList[1];
        let direction = angle > 0;
        let rotations = (direction?1:-1) * Math.round(angle/90);

        let i=0;
        switch (side) {
            case "front":
                for (; i<rotations; i++)
                    moves.push( direction? "Y0":"y0");
                break;
            case "back":
                for (; i<rotations; i++)
                    moves.push( direction? "y1":"Y1");
                break;
            
            case "right":
                for (; i<rotations; i++)
                    moves.push( direction? "x0":"X0");
                break;
            case "left":
                for (; i<rotations; i++)
                    moves.push( direction? "X1":"x1");
                break;
                
            case "top":
                for (; i<rotations; i++)
                    moves.push( direction? "z0":"Z0");
                break;
            case "bottom":
                for (; i<rotations; i++)
                    moves.push( direction? "Z1":"z1");
                break;
        }

        setState();
        setAngle(0);
        moving = false;
    }



    //-----------------------------Other Functions

    function setAngle(ang){
        face.style.transform = face.style.transform.split(" ").slice(0,2).join(" ") +
                                ` rotate(${ang}deg)`;
    }
});

