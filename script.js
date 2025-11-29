const negationSign = '-';

const resultText = {
  isNegative: false,
  digits: '0',

  toString: function () {
    if (this.isNegative) {
      return negationSign + this.digits;
    }
    return this.digits;
  },

  toNumber: function () {
    return Number(this.toString());
  },

  clear: function () {
    this.isNegative = false;
    this.digits = '0';
  },

  isClear: function () {
    return this.digits === '0';
  },

  digitsLength: function () {
    return this.digits.length;
  },

  removeDigit: function () {
    this.digits = this.digits.slice(0, this.digitsLength() - 1);
  },

  addDigit: function (digit) {
    if (this.isClear()) {
      this.digits = digit;
    } else {
      this.digits += digit;
    }
  }
}

const calculator = {
  resultText: resultText,
  expressionQueue: [],
  resultDisplay: document.querySelector('.result-text'),
  buttons: document.querySelector('.buttons-container'),

  setEventListener: function () {
    this.buttons.addEventListener("click", this.buttonPress);
  },

  buttonPress: function (event) {
    const button = event.target;
    if (button.classList.contains("number")) {
      calculator.selectNumber(button.textContent);
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
    this.resultDisplay.value = this.resultText.toString();
    this.resultDisplay.focus();
  },

  clearEntry: function () {
    this.resultText.clear();
    this.refreshDisplay();
  },

  allClear: function () {
    this.expressionQueue = [];
    this.clearEntry();
  },

  backSpace: function () {
    if (this.resultText.digitsLength() > 1) {
      this.resultText.removeDigit();
    } else {
      this.resultText.clear();
    }
    this.refreshDisplay();
  },

  selectNumber: function (number) {
    this.resultText.addDigit(number);
    this.refreshDisplay();
  },

  negate: function () {
    if (this.resultText.isNegative) {
      this.resultText.isNegative = false;
    } else {
      this.resultText.isNegative = true;
    }
    this.refreshDisplay();
  }
};

calculator.setEventListener();
calculator.clearEntry();
