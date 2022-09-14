const MAX_DIGITS_IN_DISPLAY = 10;
const displayScreen = document.getElementById('result-label');
const digitsButtons = document.querySelectorAll('.number');
const operatorsButtons = document.querySelectorAll('.operator-button');
const plusMinButton = document.getElementById('plus-minus-button');
const equalButton = document.getElementById('equals-button');

let firstNumber = 0;
let secondNumber = 0;
let operator = '';
let result = 0;
let textInScreen = "0";
let arrOperator = ['+', '-', '/', 'x', '*'];

initialHighLight();
setMouseEvents();
setKeyboardEvents();
/*****events****/
// reset

function setMouseEvents() {
    for (let i = 0; i < digitsButtons.length; i++) {
        digitsButtons[i].addEventListener('click', handleClickButtonsNumbers);
    }

    for (let i = 0; i < operatorsButtons.length; i++) {
        operatorsButtons[i].addEventListener('click', handleClickOperators);
    }

    equalButton.addEventListener('click', handleClickEqual);
}

function setKeyboardEvents() {
    document.addEventListener('keydown', handleEventKeyboard);
}

function handleClickButtonsNumbers(event) {
    let digitsEvent = event.target.textContent;
    inputDigits(digitsEvent);
}

function handleClickOperators(eventOperators) {
    let operatorTaked = eventOperators.target.textContent;
    if (operatorTaked === 'C') {
        resetCalculator();
    } else if (operatorTaked === plusMinButton.textContent) {
        handlePlusMinusButton(textInScreen);
    } else {
        arrOperator.forEach(value => {
            if (value === operatorTaked) {
                handleOperations(operatorTaked);
            }
        });
    }
}

function handleEventKeyboard(eventKey) {
    eventKey.preventDefault();
    let keyTaked = eventKey.key;
    if (keyTaked === 'Escape') {
        resetCalculator();
    }
    if (textInScreen !== 'ERROR') {
        if (keyTaked === 'Control') {
            handlePlusMinusButton(textInScreen);
        } else if (keyTaked >= 0 && keyTaked <= 9 || keyTaked === ',') {
            inputDigits(keyTaked);
        }
        arrOperator.forEach(value => {
            if (value === keyTaked) {
                handleOperations(keyTaked);
            }
        });
    }
}

function handleClickEqual(e) {
    if (firstNumber !== 0 && secondNumber === 0) {
        textInScreen = 'ERROR'
    } else if (operator !== '') {
        handleOperations(e.target.textContent);
    } 
 
    if(textInScreen[textInScreen.length-1] === ','){
        textInScreen = textInScreen.slice(0, textInScreen.length-1);
    }
    setDisplayResult(textInScreen);
}

/** calculator functions **/

function setDisplayResult(input) {
    displayScreen.textContent = input;
    setEnabledStatusForAllButtons();
}

function setEnabledStatusForAllButtons() {
    //TO-DO


}

function inputDigits(digits) {
    removeInitialHighLight(); // unhighlightAllOperatorsButtons
    if (operator !== '' && secondNumber === 0) {
        secondNumber = getSecondNumber(digits);
        unHighLightOperator();
        disabledPlusMinusButton();
        disabledCommaButton();
    } else if (digits !== ',' && textInScreen === '0') {
        textInScreen = digits;
    } else {
        addFirstNumber(digits);
        checkLength(textInScreen);
    }
    initialHighLight(); //highlightButton
    setDisplayResult(textInScreen);
}

function addFirstNumber(digits) {
    if (checkLength(textInScreen)) {
        if (digits === ',') {
            handleComma();
        } else {
            textInScreen += digits;
        }
    }
}

function getSecondNumber(digit) {
    if (digit === ',') {
        handleComma();
    } else {
        textInScreen = '';
        textInScreen += digit;
    }
    return textInScreen;
}

function checkLength(number) {
    if (number.length < MAX_DIGITS_IN_DISPLAY) {
        return true;
    } else if (number.length < MAX_DIGITS_IN_DISPLAY + 1 && !number.includes(',') && number.includes('-')) {
        return true;
    } else if (number.length < MAX_DIGITS_IN_DISPLAY + 1 && number.includes(',') && !number.includes('-')) {
        return true;
    } else if (number.length < MAX_DIGITS_IN_DISPLAY + 2 && number.includes(',') && number.includes('-')) {
        return true;
    } else {
        disabledNumericalButtons();
        return false;
    }
}

function handleComma() {
    if (textInScreen === '0') {
        textInScreen = '0'.concat(',');
    } else if (!textInScreen.includes(',')) {
        textInScreen = textInScreen.concat(',');
    }
    enabledCommaButton();
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

function convertToFloat(value) {
    let toInteger = parseFloat(replaceComma(value));
    return toInteger;
}

function addition() {
    let result = convertToFloat(firstNumber) + convertToFloat(secondNumber);
    return result;
}

function substraction() {
    let result = convertToFloat(firstNumber) - convertToFloat(secondNumber);
    return result;
}

function multiplication() {
    let result = convertToFloat(firstNumber) * convertToFloat(secondNumber);
    return result;
}

function division() {
    let result = convertToFloat(firstNumber) / convertToFloat(secondNumber);
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

    return result
}

function handleOperations(operatorPressed) {
    if (operator === '') {
        firstNumber = convertToFloat(textInScreen);
        operator = operatorPressed;
    } else if (secondNumber !== 0 && operator !== '') {
        secondNumber = convertToFloat(textInScreen);
        result = performingOperations();
        textInScreen = checkResult(result);
        firstNumber = result;
        secondNumber = 0;
        operator = operatorPressed;
    } else {
        operator = operatorPressed;
    }
    console.log(firstNumber, ' ', operator, ' ', secondNumber, '=', result);
    setDisplayResult(textInScreen);
    highlightOperator(operator);
    enabledCommaButton();
    enabledPlusMinusButton();
    disabledAllButtons(textInScreen);

}

function checkResult(result) {
    console.log(typeof result);
    let resultToString
    if (result !== undefined) {
        resultToString = result.toString();
        if (resultToString.length > MAX_DIGITS_IN_DISPLAY + 1 && result % 1 !== 0) {
            resultToString = result.toPrecision(10);
            resultToString = formatingResult(resultToString);
        }
        if (resultToString.length > MAX_DIGITS_IN_DISPLAY && result % 1 === 0) {
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
    for (let i = 0; i < operatorsButtons.length; i++) {
        if (operatorsButtons[i].textContent === operatorBtn && operatorsButtons[i].textContent !== '=') {
            operatorsButtons[i].classList.add('highLightOperator');
        } if (operatorBtn === '*') {
            document.getElementById('button-multi').classList.add("highLightOperator");

        }
    }
    enabledNumericalButtons();
}

function unHighLightOperator() {
    for (let i = 0; i < operatorsButtons.length; i++) {
        operatorsButtons[i].classList.remove('highLightOperator');
    }
}

function disabledNumericalButtons() {
    for (let i = 0; i < digitsButtons.length; i++) {
        digitsButtons[i].classList.add('disablingDigitsButtons');
        digitsButtons[i].setAttribute("disabled", true);
    }
}

function enabledNumericalButtons() {
    for (let i = 0; i < digitsButtons.length; i++) {
        if (digitsButtons[i].textContent !== ',') {
            digitsButtons[i].removeAttribute("disabled");
            digitsButtons[i].classList.remove('disablingDigitsButtons');
        }
    }
}

function initialHighLight() {
    if (textInScreen == '0') {
        enabledPlusMinusButton();
        digitsButtons[9].classList.add('disablingDigitsButtons');
        digitsButtons[9].setAttribute("disabled", true);
    }
}

function removeInitialHighLight() {
    disabledPlusMinusButton();
    digitsButtons[9].classList.remove('disablingDigitsButtons');
    digitsButtons[9].removeAttribute("disabled");
}

function disabledAllButtons(result) {
    let btnEqual = document.getElementById('equals-button');
    if (result === 'ERROR') {
        for (let i = 0; i < operatorsButtons.length; i++) {
            if (operatorsButtons[i].textContent !== 'C') {
                operatorsButtons[i].classList.add('highLightOperator');
                operatorsButtons[i].setAttribute("disabled", true);
            }
        }
        btnEqual.classList.add('highLightOperator');
        btnEqual.setAttribute("disabled", true);
        disabledNumericalButtons();
    }
}

function enabledOperators() {
    for (let i = 0; i < operatorsButtons.length; i++) {
        if (operatorsButtons[i].textContent !== plusMinButton.textContent) {
            operatorsButtons[i].removeAttribute("disabled");
        }
    }
    enabledCommaButton();
}

function enabledPlusMinusButton() {
    plusMinButton.setAttribute("disabled", true);
    plusMinButton.classList.add('disablingDigitsButtons');
}

function disabledPlusMinusButton() {
    plusMinButton.classList.remove('disablingDigitsButtons');
    plusMinButton.removeAttribute("disabled");
}


function enabledCommaButton() {
    let getComma = document.getElementById("comma-button");
    getComma.classList.add("higLightNumbers");
    getComma.setAttribute("disabled", true);
}

function disabledCommaButton() {
    let getComma = document.getElementById("comma-button");
    getComma.classList.remove("higLightNumbers");
    getComma.removeAttribute("disabled");
    getComma.classList.remove('disablingDigitsButtons');

}


function resetCalculator() {
    textInScreen = '0';
    firstNumber = 0;
    secondNumber = 0;
    operator = '';
    result = 0;
    enabledNumericalButtons();
    initialHighLight();
    enabledPlusMinusButton();
    unHighLightOperator();
    enabledOperators();
    disabledCommaButton();
    setDisplayResult(textInScreen);
}
