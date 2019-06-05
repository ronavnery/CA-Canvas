'use strict';
let canvas;
let ctx;

function onInit() {
    defineCanvas();
}

function defineCanvas() {
    canvas = document.querySelector('#my-canvas');
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth - 100
    canvas.height = window.innerHeight - 25
}