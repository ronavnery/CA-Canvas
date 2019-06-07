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
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function downloadImg(elLink, ev) {
    ev.stopPropagation();
    const imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}



function defineCanvas() {
    gCanvas = document.querySelector('#our-canvas');
    gCtx = gCanvas.getContext('2d')
    gCanvas.width = window.innerWidth - 100
    gCanvas.height = window.innerHeight - 100

    gCanvas.addEventListener('mousedown', onMouseDown)
    gCanvas.addEventListener('mousemove', onMouseMove, event)
    gCanvas.addEventListener('mouseup', onMouseUp)
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

function onMouseUp(event) {
    event.preventDefault()
    event.stopPropagation()
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
    gCtx.beginPath();
    gCtx.rect(x, y, shapeWidth, shapeHeight)
    gCtx.fillStyle = color;
    gCtx.fillRect(x, y, shapeWidth, shapeHeight)
    gCtx.stroke()
    gCtx.closePath();
}

function drawCircle(offsetX, offsetY, color) {
    gCtx.beginPath();
    gCtx.arc(offsetX, offsetY, 50, 0, 2 * Math.PI);
    gCtx.fillStyle = color;
    gCtx.fill();
    gCtx.stroke();
    gCtx.closePath();
}

function drawLine(x, y, color) {
    gCtx.beginPath();
    gCtx.arc(x, y, 5, 0, 2 * Math.PI);
    gCtx.fillStyle = color;
    gCtx.fill();
    gCtx.closePath();
}