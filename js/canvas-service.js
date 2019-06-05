'use strict';

let gUserSettings = createSettings();
let gCurrColor;
let gCurrShape;

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