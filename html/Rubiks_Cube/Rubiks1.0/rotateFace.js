const faces = document.querySelectorAll(".face");

rotaionsList = [
    "rotateY(0deg) translateZ(35vmin) rotate(0deg)",
    "rotateY(180deg) translateZ(35vmin) rotate(0deg)",
    "rotateY(90deg) translateZ(35vmin) rotate(0deg)",
    "rotateY(-90deg) translateZ(35vmin) rotate(0deg)",
    "rotateX(90deg) translateZ(35vmin) rotate(0deg)",
    "rotateX(-90deg) translateZ(35vmin) rotate(0deg)"
]



faces.forEach( (face, iter)=> {
    let x0=0, moving=false;
    let initialAng = 0;
    let currentAng;

    addMethodsToFace();
    face.reset();

    //--------------------Event Listeners

    face.addEventListener("mousedown", (event) => faceTouch(event.x));
    document.addEventListener("mousemove", (event) => rotateFace(event.x));
    document.addEventListener("mouseup", endFace);

    face.addEventListener("touchstart", (event)=> faceTouch(event.touches[0].clientX) );
    document.addEventListener("touchmove", (event)=> rotateFace(event.touches[0].clientX));
    document.addEventListener("touchend", endFace);


    function faceTouch(x){
        moving = true;
        x0 = x;
    }

    function rotateFace(x, friction = 2){
        if(!moving) return;
    
        dx = x - x0;
        ang =  dx / friction;

        currentAng = initialAng + ang;
    
        setAngle(currentAng);
    }

    function endFace(){
        if(!moving) return;
        setAngle( Math.round( currentAng/90 ) * 90);
        initialAng = currentAng;
        moving = false;
    }



    //-----------------------------Other Functions

    function setAngle(ang){
        face.style.transform = face.style.transform.split(" ").slice(0,2).join(" ") +
                                ` rotate(${ang}deg)`;
    }


    function addMethodsToFace(){
        face.reset = function(){
            face.style.transform = rotaionsList[iter];
            initialAng = 0;
        }  
    }

});

