const displayScreen = document.getElementById('result-label');
const digitsButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator-button');
const plusMinus = document.getElementById('plus-minus-button').textContent;

let firstNumber = null;
let secondNumber = null;
let operator = null;
let existsPreviusNumber = false;
let textInScreen = getDisplayResult();
let arrOperator = ['+', '-', '/', 'x', '*', '=', 'Enter'];
/****events****/

window.addEventListener("keydown", inputKeys);

function inputKeys(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9 || e.key === ',') {
        inputDigits(e.key);
    } else if (e.key === 'Escape') {
        resetCalculator();
    } else if (e.key === 'Control') {
        inputPlusMinus(displayScreen.textContent);
    } else {
        arrOperator.forEach(iterator => {
            if (iterator === e.key) {
                inputOperator(e.key);

            }
        });
    }
    setDisplayResult(textInScreen);

}

function getNumbers() {
    for (let i = 0; i < digitsButtons.length; i++) {
        digitsButtons[i].addEventListener('click', function () {
            let input = digitsButtons[i].textContent;
            inputDigits(input);

            setDisplayResult(textInScreen);

        });
    }
}

function getOperators() {
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', function () {
            let input = operators[i].textContent;
            if (input === plusMinus) {
                inputPlusMinus(textInScreen);
                setDisplayResult(textInScreen);
            } else if (input === 'C') {
                resetCalculator();
            } else {
                arrOperator.forEach(iterator => {
                    if (iterator === input) {
                        inputOperator(input);
                    }
                });
            }
          
        });
    }
}

getNumbers();
getOperators();

/** functions **/
function getDisplayResult() {
    return displayScreen.textContent;
}

function setDisplayResult(input) {
    displayScreen.textContent = input;
    if (checkLength()) {
        displayScreen.textContent = input;
    }


}
function checkLength() {
    let canWrite;

    if (textInScreen.length < 10) {
        canWrite = true;
    } else if (textInScreen.length < 11 && textInScreen.includes(',') && !textInScreen.includes('-')) {
        canWrite = true;
    } else if (textInScreen.length < 11 && !textInScreen.includes(',') && textInScreen.includes('-')) {
        canWrite = true
    }
    else if (textInScreen.length < 12 && textInScreen.includes(',') && textInScreen.includes('-')) {
        canWrite = true;
    } else {
        canWrite = false;
        disablingDigits();
    }

    return canWrite;
}



function inputDigits(digit) {
    if (operator !== null && secondNumber === null && firstNumber !== null) {
        if (digit === ',') {
            handleComma();
            textInScreen = '0,';
            secondNumber = '0,';
        } else {
            textInScreen = '';
            textInScreen += digit;
            secondNumber = digit;
        }
    } else {
        if (digit !== ',' && textInScreen === '0') {
            textInScreen = digit;
        } else {
            if (digit === ',') {
                handleComma();
            } else {
                textInScreen += digit;
            }

        }
    }
}

function handleComma() {
    if (textInScreen === '0') {
        highLightComma();
        textInScreen = '0'.concat(',');
    } else if (!displayScreen.textContent.includes(',')) {
        highLightComma();
        textInScreen += ',';
    }
    //setDisplayResult(textInScreen);
}

function highLightComma() {
    document.getElementById('comma-button').classList.add("higLightNumbers");
}


function inputPlusMinus(number) {
    let replaceComma = null;
    if (textInScreen[textInScreen.length - 1] == ',') {
        replaceComma = number.slice(0, textInScreen.length - 1) * -1;
        replaceComma += ',';
        textInScreen = replaceComma;
    } else if (displayScreen.textContent.indexOf(',') !== -1) {
        replaceComma = number.replace(',', '.');
        replaceComma = replaceComma * -1;
        textInScreen = replaceComma.toString().replace('.', ',');
    } else if (displayScreen.textContent !== '0') {
        textInScreen = (number * -1).toString();
    }

}

function replaceComma(number) {
    return number.toString().replace(',', '.');
}

function replaceDot(number) {
    let numberToString;
    numberToString = number.toString();
    if (typeof (number) === 'number') {
        numberToString = numberToString.replace('.', ',');
    }
    numberToString = numberToString.replace('.', ',');
    return numberToString;
}

function getFirstNumber(operatorBtn) {
    operator = operatorBtn;
    firstNumber = parseFloat(replaceComma(textInScreen));
}

function getSecondNumber(operatorBtn) {
    enablingDigits();
    operator = operatorBtn
    secondNumber = parseFloat(replaceComma(textInScreen));

}

function inputOperator(operatorBtn) {
    let result = 0;
    if (operator === null) {
        getFirstNumber(operatorBtn);
    } else if ((operatorBtn === 'Enter' || operatorBtn === '=') && secondNumber !== null && operator !== null) {
        getSecondNumber(operator);
        result = performingOperation(Number(firstNumber), Number(secondNumber), operator);
        firstNumber = result;
        textInScreen = replaceDot(roundResult(result, 10));
        setDisplayResult(textInScreen);
    }

    operator = operatorBtn;
    highlightOperator(operator);

}


function highlightOperator(operatorBtn) {
    unHighLightOperator();
    for (let i = 0; i < operators.length; i++) {
        if (operators[i].textContent === operatorBtn) {
            operators[i].classList.add("highLightOperator")
        } else if (operatorBtn === '*') {
            document.getElementById('button-multi').classList.add("highLightOperator");
        }

    }
    enablingDigits();
}

function unHighLightOperator() {
    for (let i = 0; i < operators.length; i++) {
        operators[i].classList.remove("highLightOperator");
    }
    document.getElementById('comma-button').classList.remove("higLightNumbers");
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
        case 'x':
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            break;

    }
    console.log('firstnumber', firstNumber, 'oeprator', operator, 'second', num2, ' result ', result)

    return result;
}

function roundResult(result, places) {
    return parseFloat(Math.round(result + 'e' + places) + 'e-' + places);
}

function disablingDigits() {
    for (let i = 0; i < digitsButtons.length; i++) {
        digitsButtons[i].classList.add("disablingDigitsButtons");
        digitsButtons[i].disabled = true;
    }
}

function enablingDigits() {
    for (let i = 0; i < digitsButtons.length; i++) {
        digitsButtons[i].disabled = false;
        digitsButtons[i].classList.remove("disablingDigitsButtons");

    }
}

function resetCalculator() {
    textInScreen = '0';
    firstNumber = null;
    secondNumber = null;
    operator = null;
    document.getElementById('comma-button').disabled = false;
    unHighLightOperator();
    enablingDigits();
    setDisplayResult(textInScreen);
}