
function inputNumbers(numbersButton, resultScreen) {
    for (let i = 0; i < numbersButton.length; i++) {
        numbersButton[i].addEventListener("click",  function() {
            let buttonValue = this.textContent;
            resultScreen.value = resultScreen.value + buttonValue;
        });
    }
}

function clearDisplay(clearButton, resultScreen) {
    clearButton.addEventListener("click", () => {
        if (clearButton.textContent === "C") {
            resultScreen.value = "";
        }
    });
}

function maxLength(resultScreen) {
    const maxElements = 9;
    let arrFull = true

    if (maxElements <= resultScreen.length) {
        arrFull = false;
    }
    return arrFull;
    
}

function run() {
    let resultScreen = document.getElementById('result-label');
    let numbersButton = document.getElementsByClassName('number-button');
    let clearButton = document.getElementById('clear-button');

    inputNumbers(numbersButton, resultScreen)

    clearDisplay(clearButton, resultScreen);


    for (let i = 0; i < numbersButton.length; i++) {
        console.log(numbersButton[i]);
    }
}


run();

