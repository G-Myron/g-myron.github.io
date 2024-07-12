const cube = document.querySelector(".cube");
const faces = document.querySelectorAll(".face");
const input = document.querySelector("input");
const HALF_SIDE = getComputedStyle(document.documentElement).getPropertyValue("--half-side").trim();
const COLORS = ["red", "orange", "blue", "green", "white", "yellow"];

let x0,y0, moving=false;
let [initialAngX, initialAngY] = [0, 0];
let currentAngX, currentAngY;


addMethodsToCube();
cube.reset();

//-------------------------------Move/Rotate Events

window.addEventListener("mousedown", () => document.body.style.cursor = "grabbing");
window.addEventListener("mouseup", () => document.body.style.cursor = "");

document.addEventListener("mousedown", (event)=> callFunction(event, firstTouch, event.x,event.y) );
document.addEventListener("mousemove", (event)=> rotateCube(event.x,event.y));
document.addEventListener("mouseup", endRotation);

document.addEventListener("touchstart", (event)=> callFunction(event, firstTouch, event.touches[0].clientX,event.touches[0].clientY) );
document.addEventListener("touchmove", (event)=> rotateCube(event.touches[0].clientX,event.touches[0].clientY));
document.addEventListener("touchend", endRotation);

//-----------------------------Other Events

document.querySelector("button#reset").addEventListener("click", cube.reset);
window.addEventListener("wheel", zoom);




//-----------------------Rotation functions

function callFunction(event, func, ...args){
    if(event.target.contains(cube))
        func(...args);
}


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

    cube.style.transform = cube.style.transform.split(" ")[0] +
                            ` rotateX(${currentAngX}deg) rotateY(${currentAngY}deg)`;
}

function endRotation() {
    if(!moving) return;
    [initialAngX, initialAngY] = [currentAngX, currentAngY];
    moving = false;
}


//------------------------Other functions

function zoom(event){
    zStr = cube.style.transform;
    z = parseInt( zStr.slice(11, zStr.indexOf("vmin")) );
    zNew = z - Math.sign(event.deltaY) * 10;
    cube.style.transform = zStr.replace( z, zNew);
}

function addMethodsToCube(){
    cube.reset = function(){
        cube.style.transform = `translateZ(-${HALF_SIDE}) rotateX(0) rotateY(0)`;
        initialAngX= initialAngY = 0;
    }
}
