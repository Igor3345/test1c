/**
 * Модуль "Счетчик"
 */

class Counter {
    constructor(quantity, maxValue) {
        this.value = Number(quantity) || 1;
        this.minValue = Number(quantity) || 1;
        this.maxValue = Number(maxValue) || Infinity;
        this.quantity = Number(quantity) || 1;
    }

    inc() {
        if (this.value < this.maxValue) {
            this.value += this.quantity;
        }
    }

    dec() {
        if (this.value > this.minValue) {
            this.value -= this.quantity;
        }
    }
}

class CounterInput extends Counter {
    constructor(inputSelector) {
        super(inputSelector.dataset.quantity, inputSelector.dataset.max);
        this.inputSelector = inputSelector;
        this.inputValue = inputSelector.value;
    }

    set inputValue(value) {
        value = Number(value)
        if (value >= this.minValue) {
            this.value = value;
            this.inputSelector.value = this.value;
        }

        if (value <= this.maxValue) {
            this.value = value;
            this.inputSelector.value = this.value;
        }


        if (value % this.quantity != 0) {
            this.inputSelector.value = this.quantity * (Math.ceil(value / this.quantity) || 1)
        }
    }

    inc() {
        super.inc();
        this.inputValue = this.value;
    }

    dec() {
        super.dec();
        this.inputValue = this.value;
    }
}

const
    counter = () => {
        document.querySelectorAll('.js-counter').forEach(item => {
            const input = item.querySelector('.counter-input');
            const plus = item.querySelector('.counter-plus');
            const minus = item.querySelector('.counter-minus');

            const counter = new CounterInput(input);

            plus.addEventListener('click', function () {
                counter.inc();
            });

            minus.addEventListener('click', function () {
                counter.dec();
            });

            input.addEventListener('input', function (e) {
                if (e.target.value.match(/[^0-9]/g)) {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }
            });

            input.addEventListener('change', function (e) {
                if (e.target.value === '' || e.target.value < this.dataset.quantity) {
                    e.target.value = this.dataset.quantity || 1;
                }
                if (this.dataset.max && (e.target.value === '' || e.target.value > this.dataset.max)) {
                    e.target.value = this.dataset.max;
                }

                counter.inputValue = e.target.value;
            })
        })


    };

export {counter, CounterInput}