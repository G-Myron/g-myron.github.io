const canvas = document.querySelector("canvas");
const goldA = 1 + Math.sqrt(5);
const goldB = 3 + Math.sqrt(5);


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

myIcon(canvas.getContext('2d'));


img = document.createElement("img");
img.src = canvas.toDataURL("image/png");
img.setAttribute("width", "500px");
document.querySelector("body").insertBefore(img, canvas.nextSibling);

function myIcon(ctx, d=400){
    let x=0;
    ctx.beginPath();
    ctx.moveTo(0,0);

    ctx.lineTo( d,0);
    ctx.lineTo( d/2, d);
    ctx.lineTo(0, 0);

    ctx.moveTo( d/2,0);
    ctx.lineTo( d/2, d);
    x = d/goldB;
    ctx.moveTo(x,0);
    ctx.lineTo(x, d/2);
    x += d/2;
    ctx.moveTo(x,0);
    ctx.lineTo(x, d/2);

    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.fillStyle = "#619"
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();

    let wave = function(x) {return 20 * Math.sin(x/10)};
    drawFunc( ctx, wave, undefined, undefined, undefined, drawStyle=[15, "orange"]);
}

function drawFunc(ctx,  f , startPoint=[100, 100], xRange=[0, 200], numOfPoints=100, drawStyle=[5,"black"]){
    [x0,y0] = startPoint;
    let incr = (xRange[1]-xRange[0]) / numOfPoints;

    ctx.beginPath();
    ctx.moveTo(x0+xRange[0], y0-f(xRange[0]));

    for (var x = xRange[0]; x <= xRange[1]; x+= incr){
        ctx.lineTo(x0 + x, y0 - f(x));
    }
    
    [ctx.lineWidth, ctx.strokeStyle] = drawStyle;
    ctx.stroke();
}

