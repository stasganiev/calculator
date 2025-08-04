'use strict';

// Variables

const display = {
    content: '',
    mode: 'waiting',
    subresult: NaN,
    operand1: NaN,
    operand2: NaN,
    dotIsExist: false,
    sign: false,
    currentOperation: ''
};
const maxLength = 12;

const allButtons = document.querySelectorAll('.key');
const displayItem = document.querySelector('.main-display');

// Handlers

const keyOnClick = (evt) => {
    evt.preventDefault();
    let btnItem = evt.target;
    let keyCode = btnItem.dataset.keyCode;

    switch (keyCode) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        pressDigit(keyCode);
        break;

        case 'div':
        case 'mul':
        case 'sub':
        case 'add':
        pressOperation(keyCode);
        break;

        case 'done':
        pressDone(keyCode);
        break;

        case 'clear':
        pressClear(keyCode);
        break;

        case 'mc':
        case 'mr':
        case 'madd':
        case 'msub':
        pressMemory(keyCode);
        break;

        default:
        pressOther(keyCode);
        break;
    }

    updateDisplay();
}

// Additionals functions

function out(str) {
    console.log(str);
}

function outt(str) {
    out(str);
    console.log(typeof(str));
}

function numberFromScreen() {

    let res = +display.content;
    if (display.sign) res = -res;

    return res;

}

function numberToScreen(num) {

    if (isNaN(num)) {
        reset();
        display.content = 'E';
        return;
    }

    display.sign = (num < 0);
    let numAbs = Math.abs(num);

    let roundResult = Math.round(numAbs);
    let roundResultStr = roundResult.toString();
    let precisionResultStr = numAbs.toFixed(8);

    let result = precisionResultStr;

    if (roundResultStr.length > maxLength) {
        result = roundResultStr[0] + '.' + roundResultStr.slice(1, 5) + ' e' + (roundResultStr.length - 1);
    } else if (precisionResultStr.length > maxLength) {
        result = precisionResultStr.slice(0, maxLength + 1);
    }

    display.content = Number(result);

}

// Main functions

function reset() {

    display.content = '';
    display.mode = 'waiting';
    display.subresult = NaN;
    display.operand1 = NaN;
    display.operand2 = NaN;
    display.dotIsExist = false;
    display.sign = false;
    display.currentOperation = '';

}

function initiolize() {

    for (let btnItem of allButtons) {
        btnItem.addEventListener('click', keyOnClick);
    }
    reset();

}

function operate(val1, val2, operation) {

    let result = 0;

    switch (operation) {
        case 'add':
            result = val1 + val2;
            break;
        case 'sub':
            result = val1 - val2;
            break;
        case 'mul':
            result = val1 * val2;
            break;
        case 'div':
            result = (val2 === 0) ? NaN : val1 / val2;
            break;
    }

    return result;

}

function updateDisplay() {

    let res = (display.sign) ? '-' : '';
    res += display.content;
    displayItem.value = res;

}

// MATH OPERATIONS

function resetWaitingMode() {

    if (display.mode === 'waiting') {
        display.content = '';
        display.mode = 'numberinput';
        display.sign = false;
        display.dotIsExist = false;
    }

}

function pressDigit(keyCode) {

    resetWaitingMode();
    if (display.content.length < maxLength) display.content += keyCode;

}

function pressOperation(keyCode) {

    if (display.mode === 'numberinput') {
        display.operand1 = numberFromScreen();
        if (isNaN(display.subresult)) {
            display.subresult = display.operand1;
        } else {
            display.subresult = operate(display.subresult, display.operand1, display.currentOperation);
        }
        display.currentOperation = keyCode;
        display.mode = 'waiting';
        numberToScreen(display.subresult);
    }

}

function pressDone(keyCode) {

    let currrentOperand = numberFromScreen();
    let result = operate(display.subresult, currrentOperand, display.currentOperation);
    numberToScreen(result);
    display.mode = 'waiting';

}

function pressClear(keyCode) {

    reset();

}

function pressMemory(keyCode) {

}

function pressOther(keyCode) {

    if (keyCode === 'dot') {

        resetWaitingMode();
        if (!display.dotIsExist) {
            if (!display.content) display.content = '0';
            display.content += '.';
            display.dotIsExist = true;
        }

    } else if (keyCode === 'sign') {

        resetWaitingMode();
        display.sign = !display.sign;

    }

}

// Module code

initiolize();
