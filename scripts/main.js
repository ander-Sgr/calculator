let currentValue = "0";
let secondNumber = "";
let operator = "";
let num1 = 0;
const numbers = document.querySelectorAll('button');
const resultScreen = document.getElementById('result-label');
const operators = document.querySelectorAll('.operator-button');

function updateDisplay() {
    resultScreen.textContent = currentValue;

}

function numbersButtons() {
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', function () {
            if (numbers[i].classList.contains('number-button') && numbers[i].value !== ',') {
                inputNumber(numbers[i].value);

            } else if (numbers[i].value === ',') {
                inputComma(numbers[i].value);
                // updateDisplay();
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
                inputPlusMinus(currentValue);
            }
            updateDisplay();
        });

    }
}

function inputNumber(digit) {

    if (currentValue === '0') {
        currentValue = digit;
    } else {
        currentValue += digit;
    }
    //resultScreen.textContent = currentValue;
}
function inputComma(digit) {
    if (currentValue === '0' || currentValue === secondNumber) {
        currentValue += digit;
    } else if (!resultScreen.textContent.includes(digit)) {
        currentValue += digit;
    }
}

function inputPlusMinus(number) {
    let replaceComma;
    if (number.includes(',')) {
        replaceComma = number.replace(',', '.');
        replaceComma *= -1;
        currentValue = replaceComma.toString().replace('.', ',');
    } else {
        currentValue = (number * -1).toString();
    }
}

function clearButton() {
    currentValue = "0";
    secondNumber = ""
    operator = "";
    resultScreen.textContent = currentValue;
}

function inputOperator(operatorButton){
    if(operator === ''){
        
    }
}



function run(){
    numbersButtons();
    updateDisplay();
    operatorsButtons();
}

run();
