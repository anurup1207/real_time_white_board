let canvas= document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
// API
let tool= canvas.getContext("2d");

let mouseDown=false;

tool.strokeStyle="red";
tool.lineWidth="3";


canvas.addEventListener("mousedown",(e)=>{
    mouseDown=true;
    beginPath({
        x:e.clientX,
        y:e.clientY
    })
    
})

canvas.addEventListener("mousemove",(e)=>{
    if(mouseDown)drawStroke({
        x:e.clientX,
        y:e.clientY
    })
})

canvas.addEventListener("mouseup",(e)=>{
    mouseDown=false;
})

function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x,strokeObj.y);
}

function drawStroke(strokeObj){
    tool.lineTo(strokeObj.x,strokeObj.y);
    tool.stroke();
}

// tool.beginPath(); // new graphich (path) (line)
// tool.moveTo(10,10); //start point
// tool.lineTo(103,150); //end point
// tool.stroke(); // fill color to line


// tool.lineTo(203,350); 
// tool.stroke();