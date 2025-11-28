const calculator = {
  resultText: '0',
  expressionQueue: [],
  resultLabel: document.querySelector('.result-text'),
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
    }
  },

  clearEntry: function () {
    this.resultText = '0';
    this.resultLabel.value = this.resultText;
    this.resultLabel.focus();
  },

  allClear: function () {
    this.clearEntry();
    this.expressionQueue = [];
  },

  backSpace: function () {
    if (this.resultText.length > 1) {
      this.resultText = this.resultText.slice(0, this.resultText.length - 1);
    } else {
      this.resultText = '0';
    }
    this.resultLabel.value = this.resultText;
    this.resultLabel.focus();
  },

  appendToResult: function (digit) {
    if (this.resultText === '0') {
      this.resultText = digit;
    } else {
      this.resultText += digit;
    }
    this.resultLabel.value = this.resultText;
    this.resultLabel.focus();
  }
};

calculator.setEventListener();
calculator.clearEntry();
