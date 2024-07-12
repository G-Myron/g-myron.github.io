var cube = document.querySelector(".cube");
var x0,y0;
var [initialAngX, initialAngY] = [0, 0];


cube.setAttribute("draggable", "true");

cube.addEventListener("drag", rotateCube);
cube.addEventListener("dragstart", firstTouch);
cube.addEventListener("dragend", endRotation);

document.querySelector("button#reset").addEventListener("click", reset);


function firstTouch(event) {
    [x0,y0] = [event.x,event.y];
    
    event.dataTransfer.setDragImage(new Image(), 0, 0);
}

function rotateCube(event, friction = 2) {
    dx = event.x - x0;
    dy = event.y - y0;

    angY =  dx / friction;
    angX = -dy / friction;

    cube.style.setProperty("transform",
        `translateZ(-35vmin) rotateX(${initialAngX + angX}deg) rotateY(${initialAngY + angY}deg)`);
    
    return [initialAngX + angX, initialAngY + angY];
}

function endRotation(event) {
    [initialAngX, initialAngY] = rotateCube(event);
}

function reset(){
    cube.style.setProperty("transform", "translateZ(-35vmin)");
    initialAngX= initialAngY = 0;
}
