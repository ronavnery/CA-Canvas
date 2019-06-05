'use strict';
let canvas;
let ctx;
let gIsMouseDown = false;
let gIsBreakOn = false;;



function onInit() {
    defineCanvas();
}

function onSubmit(ev) {
    ev.preventDefault();
    let userColorPick = document.querySelector('.user-color').value;
    let userShapePick = document.querySelector('.user-shape').value;
    let userSettings = getUserSettings();
    userSettings.userColor = userColorPick;
    userSettings.userShape = userShapePick;
    setUserSettings();
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
    let timestamp = 0;
    let mY = 0;
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
        setTimeout(function () { gIsBreakOn = false }, 30)
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


function drawRect(x, y, shapeWidth, shapeHeight) {
    ctx.beginPath();
    ctx.rect(x, y, shapeWidth, shapeHeight)
    ctx.fillStyle = getCurrColor();
    ctx.fillRect(x, y, shapeWidth, shapeHeight)
    ctx.stroke()
    ctx.closePath();
}