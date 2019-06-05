'use strict';

let timestamp = 0;
let mY = 0;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getMouseTimeSpeedDis(ev) {
    let now = Date.now();
    let currentmY = ev.screenY;
    let dt = now - timestamp;
    let distance = Math.abs(currentmY - mY);
    let speed = Math.round(distance / dt * 1000);
    mY = currentmY;
    timestamp = now;
    return speed;
}