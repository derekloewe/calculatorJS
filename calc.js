const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
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

function updateDisplay() {
    const display = document.getElementById("calcInput");
    display.value = calculator.displayValue;
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
    //console.log(calculator);
}

function backCalculator() {
    calculator.displayValue = calculator.displayValue.slice(0, -1);
}

function clearCalculator() {
    calculator.displayValue = '0';
}

function handleOperator(nextOperator) {
    const {
        firstOperand,
        displayValue,
        operator
    } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if (firstOperand === null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](firstOperand, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    //console.log(calculator);
}

const keys = document.querySelector('.calcButtons');
/* keys.addEventListener('click', (event) => {
    const {
        target
    } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        console.log('operator', target.value);
        handleOperator(target.value);
        updateDisplay();
        return;
        
    }

    if (target.classList.contains('decimal')) {
        console.log('decimal', target.value);
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('back')) {
        console.log('back', target.value);
        backCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('clear')) {
        console.log('clear', target.value);
        clearCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('clearAll')) {
        console.log('clearAll', target.value);
        resetCalculator();
        updateDisplay();
        return;
    }
    console.log('digit', target.value);

    inputDigit(target.value);
    updateDisplay();
}); */



function calcOperations(event) {
    const {
        target
    } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        console.log('operator', target.value);
        handleOperator(target.value);
        updateDisplay();
        return;

    }

    if (target.classList.contains('decimal')) {
        console.log('decimal', target.value);
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('back')) {
        console.log('back', target.value);
        backCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('clear')) {
        console.log('clear', target.value);
        clearCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('clearAll')) {
        console.log('clearAll', target.value);
        resetCalculator();
        updateDisplay();
        return;
    }
    //console.log('digit', target.value);

    inputDigit(target.value);
    updateDisplay();

}

function test(e) {
    let key = e || window.event;
    let charCode = key.keyCode || key.which || key.charCode;
    let charStr = String.fromCharCode(charCode);

    console.log(e);
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
            console.log(e.key)
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

function test2(e) {
    let key = e || window.event;
    let charCode = key.keyCode || key.which || key.charCode;
    let charStr = String.fromCharCode(charCode);

    console.log(e);
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
document.addEventListener('keypress', test);
document.addEventListener('keydown', test2);