const previousText = document.querySelector("#previous-calc");
const currentText = document.querySelector("#current-calc");
const clearAllBtn = document.querySelector("#clear-all");
const deleteBtn = document.querySelector("#delete");
const equalsBtn = document.querySelector("#equals");
const operationBtn = document.querySelectorAll("#operation");
const numberBtn = document.querySelectorAll("#number");

class Calculator {
  constructor(previousText, currentText) {
    this.previousText = previousText;
    this.currentText = currentText;
    this.clear();
  }

  clear() {
    this.current = "";
    this.previous = "";
    this.operation = undefined;
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.current.includes(".")) return;
    this.current = this.current.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.current === "") return;
    if (this.current !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previous = this.current;
    this.current = "";
  }

  compute() {
    let calculation;
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case "+":
        calculation = prev + curr;
        break;
      case "-":
        calculation = prev - curr;
        break;
      case "÷":
        calculation = prev / curr;
        break;
      case "*":
        calculation = prev * curr;
        break;
      case "%":
        calculation = prev % curr;
        break;
      default:
        return;
    }

    this.current = calculation;
    this.operation = undefined;
    this.previous = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentText.innerText = this.getDisplayNumber(this.current);
    if (this.operation != null) {
      this.previousText.innerText = `${this.getDisplayNumber(this.previous)} ${
        this.operation
      }`;
    } else {
      this.previousText.innerText = "";
    }
  }
}

const calculator = new Calculator(previousText, currentText);

numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationBtn.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearAllBtn.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
