let displayValue = "0";
let firstNumber = "";
let secondNumber = "";
let operator = "";

const resultScreen = document.getElementById('result-label');
const numbers = document.querySelectorAll('button');
const operators = document.querySelectorAll('.operator-button');
const clearButton = document.getElementById('clear-button').value;
const plusMinButton = document.getElementById('plus-minus-button').value;

function updateDisplay() {
    resultScreen.textContent = displayValue;
}

operators.forEach((opBtn) => {
    opBtn.addEventListener('click', (elEvent) => {
        let operatorPress = elEvent.target.value;
        switch (operatorPress) {
            case plusMinButton:
                inputPlusMinus(displayValue);
                break;
            case clearButton:
                resetCalculator();
                break;
            default:
                break;
        }
        inputOperator(operatorPress);

        console.log(operatorPress);
    });
});

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

function inputNumber(digit) {
    if (operator === '') {
        if (displayValue === '0') {
            displayValue = digit;
        } else {
            if (displayValue.length < 10) {
                displayValue += digit;
            }

        }
    } else {
        //second input 
        if (displayValue === firstNumber) {
            displayValue = digit;
        } else {
            if (displayValue.length < 10) {
                displayValue += digit;
            }

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
    if (displayValue[displayValue.length - 1] == ',') {
        replaceComma = number.slice(0, displayValue.length - 1) * -1;
        replaceComma += ',';
        displayValue = replaceComma;
    } else {
        if (resultScreen.textContent.includes(',')) {
            replaceComma = number.replace(',', '.');
            replaceComma = replaceComma * -1;
            displayValue = replaceComma.toString().replace('.', ',');
        } else {
            displayValue = (number * -1).toString();
        }
    }

}


function resetCalculator() {
    displayValue = "0";
    firstNumber = "";
    secondNumber = ""
    operator = "";

    // resultScreen.textContent = 0;
}

function inputOperator(operatorButton) {
    let result;
    firstNumber = displayValue;
    if (operator !== '') {
        secondNumber = displayValue;

        result = performingOperation(Number(firstNumber), Number(secondNumber), operatorButton);
        displayValue = result;
    }
    operator = operatorButton;
    displayValue = firstNumber;

    console.log('first', firstNumber, 'op', operator, 'second', secondNumber);
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


function convertDecimal(number) {
    return parseFloat(number.replace(',', '.'));
}

function run() {
    numbersButtons();
    //operatorsButtons();
    updateDisplay();
}

run();
