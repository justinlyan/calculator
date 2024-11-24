let sign;
let hasOperator = false;
let firstNum = "";
let secondNum = "";
let onFirstNumber = true;

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");

const add = (x, y) => {
  return x + y;
};

const subtract = (x, y) => {
  return x - y;
};

const multiply = (x, y) => {
  return x * y;
};

const divide = (x, y) => {
  return x / y;
};

const operate = (operator, x, y) => {
  if (operator == "+") {
    return add(x, y);
  } else if (operator == "-") {
    return subtract(x, y);
  } else if (operator == "*") {
    return multiply(x, y);
  } else if (operator == "/") {
    return divide(x, y);
  } 
};

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (!onFirstNumber && !hasOperator && firstNum) {
      onFirstNumber = true;
      firstNum = "";
    } 
    if (onFirstNumber) {
      firstNum += number.textContent;
      display.textContent = firstNum;
    } else {
      secondNum += number.textContent;
      display.textContent = secondNum;
    }
  })
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (firstNum && !hasOperator) {
      sign = operator.textContent;
      hasOperator = true;
      onFirstNumber = false;
    }

    if (firstNum && secondNum && hasOperator) {
      let result = operate(sign, parseInt(firstNum), parseInt(secondNum));
      display.textContent = result;
      firstNum = result;
      secondNum = "";
      sign = operator.textContent;
    }
  })
});

clear.addEventListener("click", () => {
  display.textContent = "0";
  firstNum = "";
  secondNum = "";
  onFirstNumber = true;
  hasOperator = false;
});

equals.addEventListener("click", () => {
  if (hasOperator && firstNum && secondNum) {
    let result = operate(sign, parseInt(firstNum), parseInt(secondNum));
    firstNum = result;
    secondNum = "";
    hasOperator = false;
    onFirstNumber = false;
    display.textContent = firstNum;
  }
})