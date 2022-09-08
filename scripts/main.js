const DISPLAY_SCREEN = document.getElementById('result-label');
const DIGITS_BUTTONS = document.querySelectorAll('.number');
const OPERATORS_BUTTONS = document.querySelectorAll('.operator-button');
const PLUS_MIN_BUTTON = document.getElementById('plus-minus-button');


let firstNumber = 0;
let secondNumber = 0;
let operator = '';
let result = 0;
let textInScreen = getDisplayResult();
let arrOperator = ['+', '-', '/', 'x', '*', '=', 'Enter'];

/*****events****/

document.addEventListener('keydown', (e) => {
    //   let keyValue = event.key;
    e.preventDefault();
    if (e.key === 'Escape') {
        resetCalculator();
    } else if (e.key === 'Control') {
        handlePlusMinusButton(textInScreen);
    } else if (e.key >= 0 && e.key <= 9 || e.key === ',') {
        inputDigit(e.key);
    }
    arrOperator.forEach(value => {
        if (value === e.key) {
            handleOperations(e.key);
        }
    });

}, false);

function getNumbers() {
    let takeNumber;
    for (let i = 0; i < DIGITS_BUTTONS.length; i++) {
        DIGITS_BUTTONS[i].addEventListener('click', function () {
            takeNumber = DIGITS_BUTTONS[i].textContent;
            inputDigit(takeNumber);

        });
    }
}

function getOperators() {
    let inputOperator
    for (let i = 0; i < OPERATORS_BUTTONS.length; i++) {
        OPERATORS_BUTTONS[i].addEventListener('click', function () {
            inputOperator = OPERATORS_BUTTONS[i].textContent;
            if (inputOperator === 'C') {
                resetCalculator();
            } else if (inputOperator === PLUS_MIN_BUTTON.textContent) {
                handlePlusMinusButton(textInScreen);
            }
            else {
                arrOperator.forEach(value => {
                    if (value === inputOperator) {
                        handleOperations(inputOperator);
                    }
                });
            }
        })

    }
}

getNumbers();
getOperators();

/** calculator functions **/

// TODO function for resolve the cutDecimals, and do a triegger for verify if the result is more 10 digist with integers

function getDisplayResult() {
    return DISPLAY_SCREEN.textContent;
}

function setDisplayResult(input) {
    DISPLAY_SCREEN.textContent = input;
}

function inputDigit(digit) {
    removeInitialHighLight();
    if (operator !== '' && secondNumber === 0) {
        getSecondNumber(digit);
        unHighLightOperator();
        unHighLightPlusMinus();
    } else if (digit !== ',' && textInScreen === '0') {
        textInScreen = digit;
    } else {
        if (checkLength(textInScreen)) {
            if (digit === ',') {
                handleComma();
            } else {
                textInScreen += digit;
            }
        }
        checkLength(textInScreen);

    }
    initialHighLight();
    setDisplayResult(textInScreen);
}


function checkLength(number) {
    // let canWrite ;
    if (number.length < 10) {
        return true;
    } else if (number.length < 11 && !number.includes(',') && number.includes('-')) {
        return true;
    } else if (number.length < 11 && number.includes(',') && !number.includes('-')) {
        return true;
    } else if (number.length < 12 && number.includes(',') && number.includes('-')) {
        return true;
    } else {
        disablingDigits();
        return false;
    }
}

function handleComma() {
    if (textInScreen === '0') {
        textInScreen = '0'.concat(',');
        highlightComma();
    } else if (!textInScreen.includes(',')) {
        textInScreen = textInScreen.concat(',');
        highlightComma();
    }
}

function handlePlusMinusButton(valueInScreen) {
    if (textInScreen[textInScreen.length - 1] === ',') {
        valueInScreen = valueInScreen.slice(0, textInScreen.length - 1) * -1;
        valueInScreen += ',';
    } else if (textInScreen.includes(',')) {
        valueInScreen = replaceComma(valueInScreen);
        valueInScreen = valueInScreen * -1;
        valueInScreen = replaceDot(valueInScreen);
    } else if (textInScreen !== '0') {
        valueInScreen = (valueInScreen * -1).toString();
    }
    textInScreen = valueInScreen;
    //highLightPlusMinus(textInScreen);
    setDisplayResult(textInScreen);

}

function replaceDot(value) {
    let changeDot = value.toString().replace('.', ',');
    return changeDot
}

function replaceComma(value) {
    let changeComma = value.toString().replace(',', '.');
    return changeComma;
}

function convertToInteger(value) {
    let toInteger = parseFloat(replaceComma(value));
    return toInteger;
}

function getSecondNumber(digit) {
    if (digit === ',') {
        handleComma();
        textInScreen = '0,';
    } else {
        textInScreen = '';
        textInScreen += digit;
    }
    secondNumber = textInScreen;

}

function addition() {
    let result = convertToInteger(firstNumber) + convertToInteger(secondNumber);
    return result;
}

function substraction() {
    let result = convertToInteger(firstNumber) - convertToInteger(secondNumber);
    return result;
}

function multiplication() {
    let result = convertToInteger(firstNumber) * convertToInteger(secondNumber);
    return result;
}

function division() {
    let result = convertToInteger(firstNumber) / convertToInteger(secondNumber);
    return result;
}

function performingOperations() {
    switch (operator) {
        case '+':
            result = addition();
            break;
        case '-':
            result = substraction();
            break;
        case '*':
        case 'x':
            result = multiplication();
            break;
        case '/':
            if (secondNumber === 0) {
                result = 'ERROR';
            } else {
                result = division();
            }
            break;
        default:
            break;
    }
    console.log(firstNumber, '--', secondNumber);
    return result
}

function handleOperations(operatorPressed) {

    if (operator === '') {
        firstNumber = convertToInteger(textInScreen);

        operator = operatorPressed;
    } else if (operator !== '' && secondNumber !== 0) {
        secondNumber = convertToInteger(textInScreen);
        result = performingOperations();
        textInScreen = checkResult(result);
        firstNumber = result;
        operator = operatorPressed;
        secondNumber = 0;
    } else {
        operator = operatorPressed;
    }
    console.log(result);
    console.log(firstNumber, '-', secondNumber);
    setDisplayResult(textInScreen);
    highLightPlusMinus();
    highlightOperator(operator);
    disablingAllButtons(textInScreen);

}

function checkResult(result) {
    console.log(typeof result);
    let resultToString
    if (result !== undefined) {
        resultToString = result.toString();
        if (resultToString.length > 11 && result % 1 !== 0) {
            resultToString = result.toPrecision(10);
            resultToString = formatingResult(resultToString);
        }
        if (resultToString.length > 10 && result % 1 === 0) {
            resultToString = 'ERROR'
        }
    }
    return replaceDot(resultToString);
}

function formatingResult(resultToString) {
    let resultFormated = resultToString;
    let dotFound = false;
    for (let i = resultToString.length - 1; i >= 0 && !dotFound; i--) {
        if (resultToString[i] === '0') {
            resultFormated = resultToString.slice(0, i);
        }
        if (resultToString[i] === '.') {
            dotFound = true;
        }

    }
    return resultFormated;
}


function highlightOperator(operatorBtn) {
    unHighLightOperator();

    for (let i = 0; i < OPERATORS_BUTTONS.length; i++) {
        if (OPERATORS_BUTTONS[i].textContent === operatorBtn && OPERATORS_BUTTONS[i].textContent !== '=') {
            OPERATORS_BUTTONS[i].classList.add('highLightOperator');
        } if (operatorBtn === '*') {
            document.getElementById('button-multi').classList.add("highLightOperator");

        }
    }
    enablingDigits();
  


}

function unHighLightOperator() {
    for (let i = 0; i < OPERATORS_BUTTONS.length; i++) {
        OPERATORS_BUTTONS[i].classList.remove('highLightOperator');
    }
    unHighLightComma();
    // 

}

function disablingDigits() {
    for (let i = 0; i < DIGITS_BUTTONS.length; i++) {
        DIGITS_BUTTONS[i].classList.add('disablingDigitsButtons');
        DIGITS_BUTTONS[i].setAttribute("disabled", true);
    }
}

function enablingDigits() {
    for (let i = 0; i < DIGITS_BUTTONS.length; i++) {
        DIGITS_BUTTONS[i].removeAttribute("disabled");
        DIGITS_BUTTONS[i].classList.remove('disablingDigitsButtons');
    }
}

function initialHighLight() {
    if (textInScreen == '0') {
        PLUS_MIN_BUTTON.classList.add('disablingDigitsButtons');
        DIGITS_BUTTONS[9].classList.add('disablingDigitsButtons');
    }
}

function removeInitialHighLight() {
    PLUS_MIN_BUTTON.classList.remove('disablingDigitsButtons');
    DIGITS_BUTTONS[9].classList.remove('disablingDigitsButtons');
}

function disablingAllButtons(result) {
    let btnEqual = document.getElementById('equals-button');
    if (result === 'ERROR') {
        for (let i = 0; i < OPERATORS_BUTTONS.length; i++) {
            if (OPERATORS_BUTTONS[i].textContent !== 'C') {
                OPERATORS_BUTTONS[i].classList.add('highLightOperator');
                OPERATORS_BUTTONS[i].setAttribute("disabled", true);
            }
        }
        btnEqual.classList.add('highLightOperator');
        btnEqual.setAttribute("disabled", true);
        disablingDigits();
    }
}

function enablingOperator() {
    for (let i = 0; i < OPERATORS_BUTTONS.length; i++) {
        OPERATORS_BUTTONS[i].disabled = false;

    }
}

function highLightPlusMinus() {
    PLUS_MIN_BUTTON.classList.add('disablingDigitsButtons');
    PLUS_MIN_BUTTON.setAttribute("disabled", true);
}

function unHighLightPlusMinus() {
    PLUS_MIN_BUTTON.disabled = false;
    PLUS_MIN_BUTTON.removeAttribute("disabled");
}


function highlightComma() {
    let getComma = document.getElementById("comma-button");
    getComma.classList.add("higLightNumbers");
    getComma.setAttribute("disabled", true);
}

function unHighLightComma() {
    let getComma = document.getElementById("comma-button");
    getComma.classList.remove("higLightNumbers");
    getComma.removeAttribute("disabled");
}


function resetCalculator() {
    textInScreen = '0';
    firstNumber = 0;
    secondNumber = 0;
    operator = '';
    result = 0;
    enablingDigits();
    initialHighLight();
    unHighLightOperator();
    enablingOperator();
    unHighLightComma();
    setDisplayResult(textInScreen);

}
initialHighLight();


/*
var a = 24.2 + 6.4;
console.log(typeof a);
console.log(a.toPrecision(5));
console.log(typeof a.toPrecision(5));
*/

