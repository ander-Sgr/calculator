const DISPLAY_SCREEN = document.getElementById('result-label');
const DIGITS_BUTTONS = document.querySelectorAll('.number');
const OPERATORS_BUTTONS = document.querySelectorAll('.operator-button');
const PLUS_MIN_BUTTON = document.getElementById('plus-minus-button');


let firstNumber = null;
let secondNumber = null;
let operator = null;
let textInScreen = getDisplayResult();
let arrOperator = ['+', '-', '/', 'x', '*', '=', 'Enter'];

/*****events****/

document.addEventListener('keydown', getKeyValues);

function getKeyValues(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9 || e.key === ',') {
        inputDigit(e.key);
    } else if (e.key === 'Escape') {
        resetCalculator();
    } else if (e.key === 'Control') {
        handlePlusMinusButton(textInScreen);
    }
    arrOperator.forEach(value => {
        if (value === e.key) {
            handleOperators(e.key);
        }
    });
}

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
            } else {
                arrOperator.forEach(value => {
                    if (value === inputOperator) {
                        handleOperators(inputOperator);
                    }
                });
            }
        })

    }
}

getNumbers();
getOperators();

/** calculator functions **/

function getDisplayResult() {
    return DISPLAY_SCREEN.innerHTML;
}

function setDisplayResult(input) {
    DISPLAY_SCREEN.textContent = input;
}

function inputDigit(digit) {
    removeInitialHighLight();
    if (operator !== null && secondNumber === null) {
        getSecondNumber(digit);
    } else if (digit !== ',' && textInScreen === '0') {
        textInScreen = digit;
    } else {
        if (digit === ',') {
            handleComma();
        } else {
            textInScreen += digit;
        }
    }
    checkLength(textInScreen);
    setDisplayResult(textInScreen);
}

function checkLength() {
    let canWrite;
    if (textInScreen.length < 10) {
        canWrite = true;
    } else if (textInScreen.length < 11 && !textInScreen.includes(',') && textInScreen.includes('.')) {
        canWrite = true;
    } else if (textInScreen.length < 11 && textInScreen.includes(',') && !textInScreen.includes('.')) {
        canWrite = true;
    } else if (textInScreen.length < 12 && textInScreen.includes(',') && textInScreen.includes('.')) {
        canWrite = true;
    } else {
        canWrite = false;
        disablingDigits();
    }
}

function handleComma() {
    if (textInScreen === '0') {
        textInScreen = '0'.concat(',');
    } else if (!textInScreen.includes(',')) {
        textInScreen = textInScreen.concat(',');
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

function handleOperators(operatorBtn) {
    let result = 0;

    if (operator === null) {
        firstNumber = convertToInteger(textInScreen);
    } else if (operator !== null && secondNumber !== null) {
        secondNumber = convertToInteger(textInScreen);
        result = performingOperation(firstNumber, secondNumber, operator);
        textInScreen = checkResult(result);
    } 
   /* if(secondNumber === null && (operator !== null && operator !== '=')){
        textInScreen = 'ERROR'
    }*/

    console.log('firstnumber', firstNumber, 'oeprator', operator, 'second', secondNumber, ' result ', result)
    operator = operatorBtn;
    setDisplayResult(textInScreen);
    highlightOperator(operator);
    disablingAllButtons(textInScreen);

}

function performingOperation(num1, num2, operatorBtn) {
    let result;
    switch (operatorBtn) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
        case 'x':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                return 'ERROR';
            }
            result = num1 / num2;
            break;
        default:
            break;
    }
    console.log('firstnumber', firstNumber, 'oeprator', operator, 'second', secondNumber, ' result ', result)

    return result;
}

function checkResult(result) {
    console.log(typeof result);
    let resultToString
    if (result !== undefined) {
        resultToString = result.toString();
        if (resultToString.length > 10 && result % 1 !== 0) {
            resultToString = result.toPrecision(10);
            resultToString = formatingResult(resultToString);
        }
        if(resultToString.length > 10 && result % 1 === 0){
            resultToString = 'ERROR'
        }
        
 
    }
    return replaceDot(resultToString);
}

function formatingResult(resultToString) {
    let resultFormated = resultToString;
    let dotFound = false;
    for (let i = resultToString.length-1; i >= 0 && !dotFound; i--) {
        if(resultToString[i] === '0'){
            resultFormated = resultToString.slice(0, resultFormated.length-1);
        }
        if(resultToString[i] === '.'){
            dotFound = true;
        }
        
    }
    return resultFormated;
}

function highlightOperator(operatorBtn) {
    unHighLightOperator();
    for (let i = 0; i < OPERATORS_BUTTONS.length; i++) {
        if (OPERATORS_BUTTONS[i].textContent === operatorBtn) {
            OPERATORS_BUTTONS[i].classList.add('highLightOperator');
        }
    }
    enablingDigits();
}

function unHighLightOperator() {
    for (let i = 0; i < OPERATORS_BUTTONS.length; i++) {
        OPERATORS_BUTTONS[i].classList.remove('highLightOperator');
    }

}

function disablingDigits() {
    for (let i = 0; i < DIGITS_BUTTONS.length; i++) {
        DIGITS_BUTTONS[i].classList.add('disablingDigitsButtons');
        DIGITS_BUTTONS[i].disabled = true;
    }
}

function enablingDigits() {
    for (let i = 0; i < DIGITS_BUTTONS.length; i++) {
        DIGITS_BUTTONS[i].disabled = false;
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
                OPERATORS_BUTTONS[i].disabled = true;
            }
        }
        btnEqual.classList.add('highLightOperator');
        btnEqual.disabled = true;
        disablingDigits();
    }
}

function enablingOperator() {
    for (let i = 0; i < OPERATORS_BUTTONS.length; i++) {
        OPERATORS_BUTTONS[i].disabled = false;

    }
}

function resetCalculator() {
    textInScreen = '0';
    firstNumber = null;
    secondNumber = null;
    operator = null;
    enablingDigits();
    initialHighLight();
    unHighLightOperator();
    enablingOperator();
    setDisplayResult(textInScreen);

}

initialHighLight();


/*
var a = 22 / 7;
console.log(typeof a);
console.log(a.toPrecision(5));
console.log(typeof a.toPrecision(5));
*/