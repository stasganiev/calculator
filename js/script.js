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

// Functions

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

function numberFromScreen() {
    return +display.content * (display.sign) ? (-1) : 1;
}

function numberToScreen(num) {
    if (num < 0) {
        display.sign = true;
        display.content = toString(-num);
    } else {
        display.sign = false;
        display.content = toString(num);
    }
}

function operate(val1, val2, operation) {
    switch (operation) {
        case 'add':
            return val1 + val2;
        case 'sub':
            return val1 - val2;
        case 'mul':
            return val1 * val2;
        case 'div':
            return (val2 === 0) ? 0 : val1 / val2;
    }
}

function initiolize() {
    for (let btnItem of allButtons) {
        btnItem.addEventListener('click', keyOnClick);
    }
    reset();
}

function pressDigit(keyCode) {
    if (display.mode === 'waiting') {
        display.content = keyCode;
        display.mode = 'numberinput';
        display.sign = false;
    } else if (display.mode === 'numberinput') {
        if (display.content.length < maxLength) display.content += keyCode;
    }
}

function pressOperation(keyCode) {
    // if (display.mode === 'waiting') {
    //     display.content = '0';
    //     display.operand1 = 0;
    //     display.currentOperation = keyCode;
    // } else if (display.mode === 'numberinput') {
    //     if (isNaN(display.operand1)) {
    //         display.operand1 = numberFromScreen();
    //     } else {
    //         let currrentOperand = numberFromScreen();
    //         if (isNaN(display.subresult)) {
    //             display.subresult = operate(display.operand1, currrentOperand, display.currentOperation);
    //             display.operand1 = currrentOperand;
    //         } else {
    //             display.subresult = operate(display.subresult, currrentOperand, display.currentOperation);
    //             display.operand1 = currrentOperand;
    //         }
    //     }
    //     display.currentOperation = keyCode;
    //     display.mode = 'waiting';
    // }
}

function pressDone(keyCode) {
    // if (display.mode !== 'numberinput') {
    //     return;
    // }
    // let currrentOperand = numberFromScreen();
    // let subResult = isNaN(display.subresult) ? display.operand1 : display.subresult;
    // let result = operate(subResult, currrentOperand, display.currentOperation);
    // numberToScreen(result);
    // display.mode = 'waiting';
}

function pressClear(keyCode) {
    reset();
}

function pressMemory(keyCode) {
}

function pressOther(keyCode) {
    if (keyCode === 'dot') {
        if (display.mode === 'waiting') {
            display.content = '0.';
            display.mode = 'numberinput';
            display.dotIsExist = true;
        } else if (display.mode === 'numberinput' && !display.dotIsExist) {
            display.content += '.';
            display.dotIsExist = true;
        }
    } else if (keyCode === 'sign') {
        display.sign = !display.sign;
        if (display.mode === 'waiting') {
            display.content = '';
            display.mode = 'numberinput';
        }
    }
}

function updateDisplay() {
    let res = (display.sign) ? '-' : '';
    res += display.content;
    displayItem.value = res;
}

// Module code

initiolize();
