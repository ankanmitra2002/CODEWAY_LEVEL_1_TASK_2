let display = document.getElementById("display");
let buttons = document.querySelectorAll(".buttons button");
let openParenthesesCount = 0;
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    let value = this.textContent;
    if (value === "AC") {
      clearDisplay();
    } else if (value === "DEL") {
      deleteLastCharacter();
    } else if (value === "=") {
      calculate();
    } else if (value === "()") {
      if (
        !display.value ||
        isOperator(display.value.slice(-1)) ||
        display.value.slice(-1) === "("
      ) {
        appendToDisplay("(");
        openParenthesesCount++;
      } else if (
        openParenthesesCount > 0 &&
        !isOperator(display.value.slice(-1) || display.value.slice(-1) === ")")
      ) {
        appendToDisplay(")");
        openParenthesesCount--;
      } else if (
        (!isNaN(display.value.slice(-1)) || display.value.slice(-1) == ")") &&
        openParenthesesCount == 0
      ) {
        appendToDisplay("*(");
        openParenthesesCount++;
      }
    } else {
      if (isOperator(display.value.slice(-1)) && isOperator(value)) {
        deleteLastCharacter();
      }
      appendToDisplay(value);
    }
  });
}

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
  openParenthesesCount = 0;
}

function calculate() {
  try {
    if (!display.value == "") {
      display.value = eval(display.value);
    }
  } catch (error) {
    display.value = "Error";
    showSnackbar("Invalid Format Used");
  }
}

function deleteLastCharacter() {
  display.value = display.value.slice(0, -1);
  if (display.value == "(") {
    openParenthesesCount--;
  }
  if (display.value == ")") {
    openParenthesesCount++;
  }
}
function isOperator(character) {
  return /[\+\-\*\/]/.test(character);
}
function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;
  snackbar.className = "show";
  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "");
    clearDisplay();
  }, 1000);
}
