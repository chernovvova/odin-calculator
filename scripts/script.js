function clear() {
    isDisplayVal = false;
    firstVal = undefined;
    secondVal = undefined;
    resultVal = undefined;
    operation = undefined;
    display.textContent = 0;
}

function changeSign() {
    display.textContent = -1 * Number(display.textContent);
}

function percent() {
    result = String(Number(display.textContent) / 100);
    if(result.trim().length <= 9)
        display.textContent = result;
}

function errorInput() {
    clear();
    display.textContent = 'Error';
}

let isDisplayVal = false;
let firstVal = undefined;
let secondVal = undefined;
let resultVal = undefined;
let operation = undefined;

const display = document.querySelector('.display');
display.textContent = '0';

const acButton = document.querySelector('.ac-button');
acButton.addEventListener('click', clear);

const signButton = document.querySelector('.sign-button');
signButton.addEventListener('click', changeSign);

const percentButton = document.querySelector('.percent-button');
percentButton.addEventListener('click', percent);

const buttons = document.querySelector('.buttons-container');

for(let button of buttons.childNodes) {
    if(['+', '-', 'x', '÷'].includes(button.textContent.trim())) {
        button.addEventListener('click', () => {
            if(operation !== undefined) {
                errorInput();
                return;
            }
            operation = button.textContent.trim();
            firstVal = Number(display.textContent);
            isDisplayVal = false;
            display.textContent = '0';
        });
    }
    else if(button.className == 'operand-button') {
        button.addEventListener('click', () => {
            if(display.textContent.trim().length >= 9) {
                return;
            }
            if(!isDisplayVal) {
                display.textContent = button.textContent;
                isDisplayVal = true;
            }
            else {
                display.textContent = display.textContent.trim() + button.textContent.trim();
            }
        });
    }
    else if(button.textContent.trim() == '=') {
        console.log("er");  
        button.addEventListener('click', () => {
            if(firstVal === undefined || !isDisplayVal) {
                errorInput();
                return;
            }
            secondVal = Number(display.textContent);
            if(operation == '+') {
                resultVal = firstVal + secondVal;
            }
            else if(operation == '-') {
                resultVal = firstVal - secondVal;
            }
            else if(operation == 'x') {
                resultVal = firstVal * secondVal;
            }
            else {
                if(secondVal == 0) {
                    errorInput();
                    return;
                }
                resultVal = firstVal / secondVal;
            }
            if(String(resultVal).length >= 9) {
                errorInput();
                return;
            }
            display.textContent = String(resultVal);
            firstVal = resultVal;
            resultVal = undefined;
            operation = undefined;
            secondVal = undefined;
        })

    }
}


