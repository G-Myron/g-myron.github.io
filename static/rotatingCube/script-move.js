var cube = document.querySelector(".cube");
var x0,y0, moving=false;
var [initialAngX, initialAngY] = [0, 0];
var currentAngX, currentAngY;

reset();

//-------------------------------Move/Rotate Events

document.addEventListener("mousedown", (event)=> firstTouch(event.x,event.y));
document.addEventListener("mousemove", (event)=> rotateCube(event.x,event.y));
document.addEventListener("mouseup", endRotation);

document.addEventListener("touchstart", (event)=> firstTouch(event.touches[0].clientX,event.touches[0].clientY));
document.addEventListener("touchmove", (event)=> rotateCube(event.touches[0].clientX,event.touches[0].clientY));
document.addEventListener("touchend", endRotation);

//-----------------------------Other Events

document.querySelector("button#reset").addEventListener("click", reset);
window.addEventListener("wheel", zoom);


//-----------------------Rotation functions

function firstTouch(x, y) {
    moving = true;
    [x0,y0] = [x,y];
}

function rotateCube(x, y, friction = 2) {
    if(!moving) return;

    dx = x - x0;
    dy = y - y0;

    angY =  dx / friction;
    angX = -dy / friction;

    [currentAngX, currentAngY] = [initialAngX + angX, initialAngY + angY];

    cube.style.transform = cube.style.transform.slice(0, cube.style.transform.indexOf("rotate")) +
                            ` rotateX(${currentAngX}deg) rotateY(${currentAngY}deg)`;
}

function endRotation() {
    if(!moving) return;
    [initialAngX, initialAngY] = [currentAngX, currentAngY];
    moving = false;
}


//------------------------Other functions

function zoom(event, magn=10){
    zStr = cube.style.transform;
    z = parseInt( zStr.slice(11, zStr.indexOf("vmin")) );
    zNew = z - Math.sign(event.deltaY) * magn;
    cube.style.transform = zStr.replace( z, zNew);
}

function reset(){
    cube.style.transform = "translateZ(-35vmin) rotateX(0) rotateY(0)";
    initialAngX= initialAngY = 0;
}
