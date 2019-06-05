'use strict';
let canvas;
let ctx;
let gIsMouseDown = false;
let gIsBreakOn = false;;


function onInit() {
    defineCanvas();
}

function defineCanvas() {
    canvas = document.querySelector('#our-canvas');
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth - 100
    canvas.height = window.innerHeight - 100

    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mousemove', onMouseMove, event)
    canvas.addEventListener('mouseup', onMouseUp)
}

function onMouseDown() {
    gIsMouseDown = true;
}


function onMouseMove(ev) {
    if (gIsBreakOn) return;
    let speed = getMouseTimeSpeedDis(ev);

    if (gIsMouseDown) {
        const { offsetX, offsetY } = ev;
        let shapeWidth = speed / 10;
        let shapeHeight = speed / 10;
        if (speed < 250) {
            shapeWidth = getRandomIntInclusive(30, 40);
            shapeHeight = getRandomIntInclusive(30, 40);
        }
        drawRect(offsetX, offsetY, shapeWidth, shapeHeight);
        gIsBreakOn = true;
        setTimeout(function () { gIsBreakOn = false }, 100)
    }
}

function onMouseUp() {
    gIsMouseDown = false;
}


function draw(ev) {
    console.log(ev);
    // Do we need this?
    // ctx.save() 
    const { offsetX, offsetY } = ev;
    console.log(offsetX, offsetY);
    drawRect(offsetX, offsetY);
}


function drawRect(x, y, shapeWidth = 150, shapeHeight = 150) {
    ctx.beginPath();
    ctx.rect(x, y, shapeWidth, shapeHeight)
    ctx.fillStyle = 'white'
    ctx.fillRect(x, y, shapeWidth, shapeHeight)
    ctx.stroke()
    ctx.closePath();
}