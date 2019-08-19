const calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: null,
    waitingForSecondOperand: false,
    operator: null,
    clearDisplay: false,
    fullString: '',
    history: false
};

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};

const ops = {
    '/': (test) => 'Divide',
    '*': (test) => 'Times',
    '+': (test) => 'Plus',
    '-': (test) => 'Minus',
    '=': (test) => 'Equal',
    'Enter': (test) => 'Equal'
};

function pushToStorage() {

}

function updateDisplay() {
    const display = document.getElementById("calcInput");

    if (calculator.operator == "Enter" || calculator == "=") {
        document.getElementById("calcOp").innerHTML = calculator.firstOperand;
        display.value = calculator.displayValue;
        calculator.fullString += calculator.firstOperand;
        console.log("enter: " + calculator.firstOperand);
    } else if (calculator.operator == "+" || calculator.operator == "-" || calculator.operator == "/" || calculator.operator == "*") {
        //document.getElementById("calcOp").innerHTML = calculator.firstOperand + calculator.operator;
        if (calculator.displayValue == calculator.firstOperand) {
            document.getElementById("calcOp").innerHTML = calculator.firstOperand + calculator.operator;
        } else {
            document.getElementById("calcOp").innerHTML = calculator.firstOperand + calculator.operator + calculator.displayValue;
            display.value = calculator.displayValue;
        }
        //calculator.fullString += calculator.operator;
        //console.log("OP1: "+ calculator.firstOperand + calculator.operator );
        calculator.fullString += calculator.firstOperand + calculator.operator;

    } else {
        document.getElementById("calcOp").innerHTML = calculator.firstOperand + (calculator.operator) ? calculator.operator : "" + calculator.displayValue;
        display.value = calculator.displayValue;
        console.log("OP2: " + !calculator.firstOperand ? calculator.firstOperand: "" + calculator.operator + calculator.displayValue);
        calculator.fullString += calculator.firstOperand;
    }
    // document.getElementById("calcOp").innerHTML = calculator.firstOperand + calculator.operator + calculator.displayValue;

}



function inputDigit(digit) {
    const {
        displayValue,
        waitingForSecondOperand
    } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    //console.log(calculator);

}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) return;

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    calculator.clearDisplay = false;
    //console.log(calculator);
}

function backCalculator() {
    if (calculator.operator == null) {
        calculator.displayValue = calculator.displayValue.slice(0, -1);
    }

}

function clearCalculator() {
    calculator.displayValue = '0';
}

function handleOperator(nextOperator) {
    const {
        firstOperand,
        displayValue,
        operator,
        clearDisplay,
        fullString,
        secondOperand
    } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        document.getElementById("calcOp").innerHTML = calculator.firstOperand + calculator.operator + calculator.displayValue;
        return;
    }

    if (firstOperand === null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](firstOperand, inputValue);
        document.getElementById("calcOp").innerHTML = calculator.firstOperand + calculator.operator + calculator.displayValue;
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
        //calculator.fullString = String(result);
    }
    if(secondOperand === null){

    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;

    //console.log(calculator);
}

const keys = document.querySelector('.calcButtons');

function calcOperations(event) {
    const {
        target
    } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        //console.log('operator', target.value);
        handleOperator(target.value);
        updateDisplay();
        //calculator.displayValue = "";
        return;

    }

    if (target.classList.contains('decimal')) {
        //console.log('decimal', target.value);
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('back')) {
        //console.log('back', target.value);
        backCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('clear')) {
        //console.log('clear', target.value);
        clearCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('clearAll')) {
        //console.log('clearAll', target.value);
        resetCalculator();
        updateDisplay();
        return;
    }
    //console.log('digit', target.value);

    inputDigit(target.value);
    updateDisplay();

}

function keysPressed(e) {
    let key = e || window.event;
    let charCode = key.keyCode || key.which || key.charCode;
    let charStr = String.fromCharCode(charCode);

    //console.log(e);
    //console.log(key);
    //console.log(charCode);
    switch (charCode) {
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
            //console.log(e.key)
            divButton = "button" + e.key;
            buttonPresed(divButton, e.key);
            inputDigit(e.key);
            updateDisplay();
            break;
            //Operators
        case 42:
        case 45:
        case 43:
        case 47:
        case 13:
            keyValue = "=";
            divButton = "button";
            buttonPresed(divButton, e.key);
            handleOperator(e.key);
            updateDisplay();
            break;
            //Remove number
            //Other
        case "Backspace":
            keyValue = "Back";
            divButton = "buttonBack";
            buttonPresed(divButton, e.key);
            backCalculator();
            updateDisplay();
            break;
            //Clear
        case 99:
            keyValue = "C";
            divButton = "buttonC";
            buttonPresed(divButton, e.key);
            resetCalculator();
            updateDisplay();
            break;
            //CE Clears recent entry Shift+C
        case 67:
            keyValue = "CE";
            divButton = "buttonCE";
            buttonPresed(divButton, e.key);
            clearCalculator();
            updateDisplay();
            break;
        case 46:
            keyValue = ".";
            divButton = "buttonDot";
            buttonPresed(divButton, e.key);
            inputDecimal(e.key);
            updateDisplay();
            break;

        default:

            break;

    }
}

function specialKeys(e) {
    let key = e || window.event;
    let charCode = key.keyCode || key.which || key.charCode;
    let charStr = String.fromCharCode(charCode);

    //console.log(e);
    //console.log(key);
    //console.log(charCode);
    switch (key.key) {
        case "Backspace":
            keyValue = "Back";
            divButton = "buttonBack";
            buttonPresed(divButton, e.key);
            backCalculator();
            updateDisplay();
            break;
            //Clear
            //CE Clears recent entry Shift+C
        case "Escape":
            keyValue = "CE";
            divButton = "buttonCE";
            buttonPresed(divButton, e.key);
            clearCalculator();
            updateDisplay();
            break;
            //Clear
        case "Delete":
            keyValue = "C";
            divButton = "buttonC";
            buttonPresed(divButton, e.key);
            resetCalculator();
            updateDisplay();
            break;

        default:

            break;

    }
}

function buttonPresed(divButton, key) {
    //console.log("twetr: " + key)
    //console.log(divButton);
    if (divButton == "button") {
        divButton += ops[key](key.code);
    }
    //console.log(divButton);
    document.getElementById(divButton).classList.add("pressed");
    setTimeout(function () {
        document.getElementById(divButton).classList.remove("pressed");
    }, 200);
}

keys.addEventListener('click', calcOperations);
document.addEventListener('keypress', keysPressed);
document.addEventListener('keydown', specialKeys);

//Show Hide History
function hideShowhistory(e) {
    if (calculator.history) {
        document.getElementById("calcHistoryText").style.display = "none";
        document.getElementById("calcHistory").style.width = "0px";
        calculator.history = false;
        document.getElementById("calcHistoryShow").classList.remove("showHistory");
        document.getElementById("calcHistoryShow").classList.add("hideHistory");
    } else {
        document.getElementById("calcHistoryText").style.display = "block";
        document.getElementById("calcHistory").style.width = "10vw";
        calculator.history = true;
        document.getElementById("calcHistoryShow").classList.remove("hideHistory");
        document.getElementById("calcHistoryShow").classList.add("showHistory");
    }

}


//historyState = document.getElementById("calcHistoryShow");
//historyState.addEventListener('click', hideShowhistory);
document.getElementById("calcHistoryShow").onclick = function () {
    hideShowhistory();
};