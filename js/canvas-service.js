'use strict';

let gUserSettings = createSettings();
let gCurrColor = '#ff0000';
let gCurrShape = 'rect';

function createSettings() {
    return {
        userColor: null,
        userShape: null
    }
}

function getUserSettings() {
    return gUserSettings;
}

function setUserSettings() {
    gCurrColor = gUserSettings.userColor;
    gCurrShape = gUserSettings.userShape;
}

function getCurrColor() {
    return gCurrColor;
}

function getCurrShape() {
    return gCurrShape;
}