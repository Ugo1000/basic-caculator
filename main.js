function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return b === 0 ? "Error: Division by 0" : a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let shouldResetScreen = false;

const display = document.getElementById("display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

digitButtons.forEach((button) =>
  button.addEventListener("click", () => appendDigit(button.textContent))
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.dataset.operator))
);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clearCalculator);

function appendDigit(digit) {
  if (display.textContent === "0" || shouldResetScreen) resetDisplay();
  display.textContent += digit;
}

function resetDisplay() {
  display.textContent = "";
  shouldResetScreen = false;
}

function clearCalculator() {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
  shouldResetScreen = false;
}

function setOperator(operator) {
  if (currentOperator && shouldResetScreen) {
    currentOperator = operator;
    return;
  }
  if (firstNumber === "") {
    firstNumber = display.textContent;
  } else if (!shouldResetScreen) {
    secondNumber = display.textContent;
    let result = operate(
      currentOperator,
      parseFloat(firstNumber),
      parseFloat(secondNumber)
    );
    if (typeof result === "number")
      result = Math.round(result * 1000000) / 1000000;
    display.textContent = result;
    firstNumber = result;
  }
  currentOperator = operator;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperator === "" || shouldResetScreen) return;
  secondNumber = display.textContent;
  let result = operate(
    currentOperator,
    parseFloat(firstNumber),
    parseFloat(secondNumber)
  );
  if (result === "Error: Division by 0") {
    display.textContent = "Nice try!";
    clearCalculator();
    return;
  }
  result = Math.round(result * 1000000) / 1000000;
  display.textContent = result;
  firstNumber = result;
  currentOperator = "";
  shouldResetScreen = true;
}
