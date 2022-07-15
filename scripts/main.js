
const clearButton = document.getElementById('clear-button');
const plusMinBtn = document.getElementById('plus-minus-button');
const commaButton = document.getElementById('comma-button');
const operatorButtons = document.getElementsByClassName('operator-button');

let firstNumber = "";
let secondNumber = "";
let operator = "";

const resultScreen = document.querySelector("#result-label");
const numbersButtons = document.querySelectorAll(".number-button");
numbersButtons.forEach(buttonNumber => {
    buttonNumber.addEventListener('click', (event) => {
        let newInput = event.target.textContent;
        console.log(newInput);
         inputComma(buttonNumber.textContent);
         firstNumber = inputNumber(buttonNumber.textContent);    
    });

});

console.log(firstNumber);

Array.from(operatorButtons).forEach(op => {
    op.addEventListener('click', () => {
        inputOperator(op.textContent);
        inputPlusMinus(op.textContent);
    })
});

function inputNumber(digit) {
    if (resultScreen.textContent === '0' && digit !== ',') {
        return resultScreen.textContent = digit;
    } else {
        return resultScreen.textContent += digit;
    }

}

function inputComma(digit) {
    if (digit === ',') {
        commaButton.disabled = true;
    }
}


function inputPlusMinus(btnOperator) {
    let existsSign = resultScreen.textContent.includes('-');

    if ((!existsSign && resultScreen.textContent !== '0' && btnOperator === '+/-')) {
        if (resultScreen.textContent !== '0,') {
            resultScreen.textContent = '-'.concat(resultScreen.textContent);
        }
    } else if (btnOperator === '+/-') {
        resultScreen.textContent = resultScreen.textContent.replace('-', '');
    }
}

function inputOperator(btnOperator) {

    switch (btnOperator) {
        case 'C':
            resultScreen.textContent = '0';
            commaButton.disabled = false;
            firstNumber = "";
            secondNumber = "";
            break;
        case '+':
            commaButton.disabled = false;
            operator = btnOperator;
            break;
        default:
            break;
    }
}
