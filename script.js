// Function to append value to the display
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
  }
  
  // Function to clear the display
  function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
  }
  
  // Function to delete the last character
  function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
  }
  
  // Function to calculate the result
  function calculateResult() {
    const display = document.getElementById('display');
    try {
      const result = evaluateExpression(display.value);
      display.value = result;
    } catch (error) {
      display.value = 'Error';
    }
  }
  
  // Function to evaluate the expression
  function evaluateExpression(expression) {
    const tokens = expression.match(/(\d+\.?\d*)|([\+\-\*\/])/g) || [];
    const values = []; // Stack for numbers
    const operators = []; // Stack for operators
  
    // Precedence of operators
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
  
    // Helper function to apply an operator
    function applyOperator() {
      const operator = operators.pop();
      const b = values.pop();
      const a = values.pop();
  
      switch (operator) {
        case '+':
          values.push(a + b);
          break;
        case '-':
          values.push(a - b);
          break;
        case '*':
          values.push(a * b);
          break;
        case '/':
          if (b === 0) throw new Error('Division by zero');
          values.push(a / b);
          break;
        default:
          throw new Error('Invalid operator');
      }
    }
  
    // Process each token
    tokens.forEach(token => {
      if (!isNaN(token)) {
        // If the token is a number, push it to the values stack
        values.push(parseFloat(token));
      } else {
        // If the token is an operator, handle precedence
        while (
          operators.length &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          applyOperator();
        }
        operators.push(token);
      }
    });
  
    // Apply remaining operators
    while (operators.length) {
      applyOperator();
    }
  
    // The final result is the last value in the stack
    return values.pop();
  }