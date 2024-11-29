let sign;
let hasOperator = false;
let firstNum = "";
let secondNum = "";
let onFirstNumber = true;
let canAddDecimal = true;
let hasDecimal = false;

const display = document.querySelector(".display");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");
const decimalBtn = document.querySelector(".decimal");
const deleteBtn = document.querySelector(".delete")

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
  if (y === 0) {
    clear();
    return "Error";
  }
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

const clear = () => {
  firstNum = "";
  secondNum = "";
  onFirstNumber = true;
  hasOperator = false;
  canAddDecimal = true;
  hasDecimal = false;
}

numberBtns.forEach((number) => {
  number.addEventListener("click", () => {
    if (!onFirstNumber && !hasOperator && firstNum) {
      onFirstNumber = true;
      firstNum = "";
      hasDecimal = false;
    } 
    if (onFirstNumber) {
      if (firstNum === "0") {
        firstNum = '';
      }
      firstNum += number.textContent;
      display.textContent = firstNum;
    } else {
      if (secondNum === "0") {
        secondNum = "";
      }
      secondNum += number.textContent;
      display.textContent = secondNum;
    }
  })
});

decimalBtn.addEventListener("click", () => {
  if (canAddDecimal) {
    if (onFirstNumber) {
      if (!firstNum) {
        firstNum = "0.";
      } else {
        firstNum += ".";
      }
      display.textContent = firstNum;
      canAddDecimal = false;
      hasDecimal = true;
    } else {
      if (!secondNum) {
        secondNum = "0.";
      } else {
        secondNum += ".";
      }
      display.textContent = secondNum;
      canAddDecimal = false;
      hasDecimal = true;
    }
  }
});

operatorBtns.forEach((operator) => {
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

    canAddDecimal = true;
  })
});

clearBtn.addEventListener("click", () => {
  display.textContent = "0";
  clear();
});

equalsBtn.addEventListener("click", () => {
  if (hasOperator && firstNum && secondNum) {
    let result;
    if (hasDecimal) {
      result = operate(sign, parseFloat(firstNum), parseFloat(secondNum));
    } else {
      result = operate(sign, parseInt(firstNum), parseInt(secondNum));
    }

    firstNum = result;
    secondNum = "";
    hasOperator = false;
    onFirstNumber = false;
    canAddDecimal = true;
    display.textContent = firstNum;
  }
});

deleteBtn.addEventListener("click", () => {
  if (onFirstNumber && firstNum) {
    let firstNumArray = firstNum.split('');
    firstNumArray.pop();
    firstNum = firstNumArray.join('');
    if (!firstNum) {
      firstNum = "0";
    }
    display.textContent = firstNum;
  } else if (!onFirstNumber && secondNum) {
    let secondNumArray = secondNum.split('');
    secondNumArray.pop();
    secondNum = secondNumArray.join('');
    if (!secondNum) {
      secondNum = "0";
    }
    display.textContent = secondNum;
  }
});