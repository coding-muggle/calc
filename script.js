let firstOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;
let display = document.getElementById('result');

function appendNumber(number) {
    if (display.value === '0' || shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    display.value += number;
}

function appendDecimal() {
    if (shouldResetDisplay) {
        display.value = '0';
        shouldResetDisplay = false;
    }
    if (!display.value.includes('.')) {
        display.value += '.';
    }
}

function clearDisplay() {
    display.value = '0';
    firstOperand = null;
    currentOperator = null;
}

function backspace() {
    if (display.value.length === 1 || (display.value.length === 2 && display.value.startsWith('-'))) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function setOperation(operator) {
    if (currentOperator !== null && !shouldResetDisplay) {
        calculate();
    }
    firstOperand = parseFloat(display.value);
    currentOperator = operator;
    shouldResetDisplay = true;
}

function calculate() {
    if (currentOperator === null || shouldResetDisplay) return;
    
    const secondOperand = parseFloat(display.value);
    let result;
    
    switch (currentOperator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = secondOperand === 0 ? 'Error' : firstOperand / secondOperand;
            break;
        default:
            return;
    }
    
    display.value = result;
    firstOperand = result;
    currentOperator = null;
    shouldResetDisplay = true;
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendDecimal();
    if (e.key === '=' || e.key === 'Enter') calculate();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === 'Backspace') backspace();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperation(e.key);
    }
});