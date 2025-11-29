const negationSign = '-';

const calculator = {
  resultText: '0',
  expressionQueue: [],
  resultDisplay: document.querySelector('.result-text'),
  buttons: document.querySelector('.buttons-container'),

  setEventListener: function () {
    this.buttons.addEventListener("click", this.buttonPress);
  },

  buttonPress: function (event) {
    const button = event.target;
    if (button.classList.contains("number")) {
      calculator.appendToResult(button.textContent);
    } else if (button.classList.contains('clear-entry')) {
      calculator.clearEntry();
    } else if (button.classList.contains('all-clear')) {
      calculator.allClear();
    } else if (button.classList.contains('backspace')) {
      calculator.backSpace();
    } else if (button.classList.contains('negate')) {
      calculator.negate();
    }
  },

  refreshDisplay: function () {
    this.resultDisplay.value = this.resultText;
    this.resultDisplay.focus();
  },

  clearEntry: function () {
    this.resultText = '0';
    this.refreshDisplay();
  },

  allClear: function () {
    this.clearEntry();
    this.expressionQueue = [];
  },

  backSpace: function () {
    // Because resultText is formatted as an optional minus sign followed by n number of digits,
    // we need check if resultText is positive or negative to accurately calculate the number of digits it contains.
    if (this.resultText.charAt(0) === negationSign) {
      if (this.resultText.length == 2) {
        this.resultText = '0';
      } else {
        this.resultText = this.resultText.slice(0, this.resultText.length - 1);
      }
    } else {
      if (this.resultText.length > 1) {
        this.resultText = this.resultText.slice(0, this.resultText.length - 1);
      } else {
        this.resultText = '0';
      }
    }
    this.refreshDisplay();
  },

  appendToResult: function (digit) {
    if (this.resultText === '0') {
      this.resultText = digit;
    } else {
      this.resultText += digit;
    }
    this.refreshDisplay();
  },

  negate: function () {
    if (this.resultText !== '0') {
      if (this.resultText.charAt(0) === negationSign) {
        this.resultText = this.resultText.slice(1, this.resultText.length);
      } else {
        this.resultText = negationSign + this.resultText;
      }
    }
    this.refreshDisplay();
  }
};

calculator.setEventListener();
calculator.clearEntry();
