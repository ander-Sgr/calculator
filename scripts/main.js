const displayScreen = document.getElementById('result-label');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator-button');
const plusMinus = document.getElementById('plus-minus-button').textContent;

let firstNumber = null;
let secondNumber = null;
let operator = null;
let existsPreviusNumber = false;
let textInScreen = getDisplayResult();
let arrOperator = ['+', '-', '/', 'x', '*', '='];
/****events****/

window.addEventListener("keydown", inputKeys);

function inputKeys(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        inputNumber(e.key);
    } else if (e.key === 'Escape') {
        resetCalculator();
    } else if (e.key === ',') {
        inputComma(e.key);
    } else if (e.key === 'Control') {
        inputPlusMinus(displayScreen.textContent);
    } else {
        arrOperator.forEach(iterator => {
            if (iterator === e.key) {
                inputOperator(e.key);

                console.log(e.key, ' ', iterator)
            }
        });
    }
}

function getNumbers() {
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', function () {
            let input = numbers[i].textContent;
            if (input !== ',') {
                inputNumber(numbers[i].textContent);
            } else {
                inputComma(input);

            }
        });
    }
}

function getOperators() {
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', function () {
            let input = operators[i].textContent;
            if (input === plusMinus) {
                inputPlusMinus(displayScreen.textContent);
            } else if (input === 'C') {
                resetCalculator();
            }
            arrOperator.forEach(iterator => {
                if (iterator === input) {
                    inputOperator(input);
                }
            });
            setDisplayResult(textInScreen);
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
}

function inputNumber(digit) {

    if (operator !== null && secondNumber === null) {
        textInScreen = '';
        textInScreen += digit;
        secondNumber = digit;
    } else {
        if (textInScreen === '0') {
            textInScreen = digit;
        } else {
            textInScreen += digit;
        }
    }
    setDisplayResult(textInScreen);

}

function inputComma(comma) {
    if (textInScreen === '0') {
        textInScreen = '0'.concat(comma);
    } else if (!textInScreen.includes(',')) {
        textInScreen += comma;
    }
    setDisplayResult(textInScreen);
    highLightComma(comma);
}

function highLightComma(comma) {
    comma = document.getElementById('comma-button').classList.add("higLightNumbers");
}

function inputPlusMinus(number) {
    let replaceComma;
    if (textInScreen[textInScreen.length - 1] == ',') {
        replaceComma = number.slice(0, textInScreen.length - 1) * -1;
        replaceComma += ',';
        textInScreen = replaceComma;
    } else if (displayScreen.textContent.indexOf(',') !== -1) {
        replaceComma = number.replace(',', '.');
        replaceComma = replaceComma * -1;
        textInScreen = replaceComma.toString().replace('.', ',');
    } else {
        textInScreen = (number * -1);
    }
    setDisplayResult(textInScreen);
}

function replaceComma(number) {
    return number.replace(',', '.');
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
    operator = operatorBtn
    secondNumber = parseFloat(replaceComma(textInScreen));

}

function inputOperator(operatorBtn) {
    let result;
    if (operator === null) {
        getFirstNumber(operatorBtn);

    } else if (operatorBtn === '=' && operator !== null) {
        getSecondNumber(operator);
        result = performingOperation(firstNumber, secondNumber, operator);
        textInScreen = replaceDot(result);
    }
    operator = operatorBtn;

    highlightOperator(operator);


}

function highlightOperator(operatorBtn) {
    unHighLightOperator();
    for (let i = 0; i < operators.length; i++) {
        if (operators[i].textContent === operatorBtn) {
            operators[i].classList.add("highLightOperator")
        }

    }
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
            if (num2 === 0) {
                result = 'ERROR';
            }
            result = num1 / num2;
            break;
        default:
            break;

    }
    console.log('firstnumber', firstNumber, 'oeprator', operator, 'second', secondNumber, ' result ', result)

    return result;
}

function roundResult(result, places) {
    return parseFloat(Math.round(result + 'e' + places) + 'e-' + places);
}

function resetCalculator() {

    textInScreen = '0';
    setDisplayResult(textInScreen);
    firstNumber = null;
    secondNumber = null;
    operator = null;
    unHighLightOperator();
}