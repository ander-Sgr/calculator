let displayValue = "0";
let firstNumber = "";
let secondNumber = "";
let operator = "";

const numbers = document.querySelectorAll('button');
const resultScreen = document.getElementById('result-label');
const operators = document.querySelectorAll('.operator-button');

function updateDisplay() {
    resultScreen.textContent = displayValue;

}

function numbersButtons() {
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', function () {
            if (numbers[i].classList.contains('number-button') && numbers[i].value !== ',') {
                inputNumber(numbers[i].value);
            } else if (numbers[i].value === ',') {
                inputComma(numbers[i].value);
            }
            updateDisplay();
        })
    }
}

function operatorsButtons() {
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', function () {
            if (operators[i].value === 'clear') {
                clearButton();

            } else if (operators[i].value === 'plusMin') {
                inputPlusMinus(displayValue);
            } else {
                inputOperator(operators[i].value);
            }
            //  inputOperator(operators[i].value);
            updateDisplay();
        });

    }
}




function inputNumber(digit) {
    if (operator === '') {
        if (displayValue === '0') {
            displayValue = digit;
        } else {
            displayValue += digit;
        }
    } else {
        //second input 
        if (displayValue === firstNumber) {
            displayValue = digit;
        } else {
            displayValue += digit;
        }
    }

}
function inputComma(digit) {
    if (displayValue === '0' || displayValue === secondNumber) {
        displayValue += digit;
    } else if (!resultScreen.textContent.includes(digit)) {
        displayValue += digit;
    }
}

function inputPlusMinus(number) {
    let replaceComma;
    if (resultScreen.textContent.includes(',')) {
        replaceComma = number.replace(',', '.');
        replaceComma = replaceComma * -1;
        displayValue = replaceComma.toString().replace('.', ',');
    } else {
        displayValue = (number * -1).toString();
    }
}

function clearButton() {
    displayValue = "0";
    secondNumber = ""
    highLightOperator('');

    operator = "";

    // resultScreen.textContent = 0;
}

function inputOperator(operatorButton) {
    if (operator !== '') {
        secondNumber = displayValue;
        result = performingOperation(parseFloat(convertDecimal(firstNumber)), parseFloat(convertDecimal(secondNumber)), operator);
        displayValue = result;
        firstNumber = displayValue;
        result = '';

    } else {
        operator = operatorButton;
        firstNumber = displayValue;
        highLightOperator(operatorButton)
    }
    highLightOperator('')
}

function performingOperation(num1, num2, opButton) {
    let result;
    switch (opButton) {
        case 'plus':
            result = num1 + num2;

            break;
        case 'minus':
            result = num1 - num2;

            break;
        case 'multi':
            result = num1 * num2;

            break;
        case 'divide':
            if (num2 === 0) {
                return 'ERROR';
            }
            result = num1 / num2;

            break;
        default:
            break;
    }

    return result;
}

function highLightOperator(operator) {
    for (let i = 0; i < operators.length; i++) {
        if (operator !== '') {
            operators[i].style.backgroundColor = 'red';
        }
      //  operators[i].style.backgroundColor = 'blue';

    }

}



function convertDecimal(number) {
    return parseFloat(number.replace(',', '.'));
}

function run() {
    numbersButtons();
    operatorsButtons();
    updateDisplay();
}

run();
