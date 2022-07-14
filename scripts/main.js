let storeValues = [];
let firstNumber = "";
let secondNumber = "";
let operator;
const resultScreen = document.getElementById('result-label');
const numbersButtons = document.getElementsByClassName('number-button');
const clearButton = document.getElementById('clear-button');
const plusMinBtn = document.getElementById('plus-minus-button');
const commaButton = document.getElementById('comma-button');
const operatorButtons = document.getElementsByClassName('operator-button');

Array.from(numbersButtons).forEach(btn => {
    btn.addEventListener('click', () => {
        inputNumber(btn.textContent);
        inputComma(btn.textContent);
    });

});

Array.from(operatorButtons).forEach(op => {
    op.addEventListener('click', () => {
        inputOperator(op.textContent);
        inputPlusMinus(op.textContent);
    })
});

/*
clearButton.addEventListener("click", () => {
    if (clearButton.textContent === "C") {
        resultScreen.innerHTML = "0";
        commaButton.disabled = false;
    }
});*/

function inputNumber(digit) {
    if (resultScreen.textContent === '0' && digit !== ',') {
        resultScreen.textContent = digit;
    } else {
        resultScreen.textContent += digit;
    }

}

function inputComma(digit) {
    if (digit === ',') {
        commaButton.disabled = true;
    }
}


function inputPlusMinus(operator) {
    /* if (resultScreen.textContent.includes('-')) {
         plusMinBtn.disabled = true;
     }*/
    if (operator === getPlusMinus() && resultScreen.textContent !== '0') {
        resultScreen.textContent = '-' + resultScreen.textContent;
    } else {
        if (resultScreen.textContent.includes('-')) {
            console.log('si')
        }

    }
}

function inputOperator(operator) {

    switch (operator) {
        case 'C':
            resultScreen.textContent = "0";
            commaButton.disabled = false;
            plusMinBtn.disabled = false;
            break;

        default:
            break;
    }
}
function getPlusMinus() {
    return plusMinBtn.textContent;
}