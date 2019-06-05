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

function onClear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        draw(offsetX, offsetY, shapeWidth, shapeHeight);
        if(getCurrShape() === 'line') return;
        gIsBreakOn = true;
        setTimeout(function () { gIsBreakOn = false }, 30)
    }
}

function onMouseUp() {
    gIsMouseDown = false;
}


function draw(x, y, width, height) {
    let currColor = getCurrColor();
    let currShape = getCurrShape();
    if (currShape === 'rect') drawRect(x, y, width, height, currColor);
    else if (currShape === 'circle') drawCircle(x, y, currColor);
    else if (currShape === 'line') drawLine(x, y, currColor);
}


function drawRect(x, y, shapeWidth, shapeHeight, color) {
    ctx.beginPath();
    ctx.rect(x, y, shapeWidth, shapeHeight)
    ctx.fillStyle = color;
    ctx.fillRect(x, y, shapeWidth, shapeHeight)
    ctx.stroke()
    ctx.closePath();
}

function drawCircle(offsetX, offsetY, color) {
    ctx.beginPath();
    ctx.arc(offsetX, offsetY, 50, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawLine(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}