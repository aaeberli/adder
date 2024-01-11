function calculateResult() {
    try {
        const result = evaluateExpression(displayValue);
        return result.toString();
    } catch (error) {
        return "";
    }
}

function evaluateExpression(expression) {
    const outputQueue = [];
    const operatorStack = [];
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };

    const isOperator = (token) => precedence.hasOwnProperty(token);

    const shuntOperators = (operator) => {
        while (
            operatorStack.length > 0 &&
            isOperator(operatorStack[operatorStack.length - 1]) &&
            precedence[operator] <= precedence[operatorStack[operatorStack.length - 1]]
        ) {
            outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(operator);
    };

    expression.split(/(\d*\.\d+|\d+|[\+\-\*\/\(\)])\s*/).forEach((token) => {
        if (!isNaN(parseFloat(token))) {
            outputQueue.push(parseFloat(token));
        } else if (isOperator(token)) {
            shuntOperators(token);
        }
    });

    while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop());
    }

    return evaluateRPN(outputQueue);
}

function evaluateRPN(rpn) {
    const stack = [];

    rpn.forEach((token) => {
        if (typeof token === 'number') {
            stack.push(token);
        } else if (token in operators) {
            const operand2 = stack.pop();
            const operand1 = stack.pop();
            stack.push(operators[token](operand1, operand2));
        }
    });

    return stack.pop();
}

const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
}
