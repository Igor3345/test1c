import {defaultConfigs} from "./validatorDefaultConfigs";
import IMask from 'imask';

export default class Validator {
    constructor(form, configs) {
        this.form = form;
        this.configs = defaultConfigs;
        this.invalidInputs = [];
        this.validatedInputsInfo = [];
        if (configs) {
            this.setConfig(this.configs, configs);
        }
        if (this.form) {
            this.setInputs()
        } else {
            throw Error("В конструктор небыла передана форма")
        }

    }

    setConfig(configs, customConfigs) {
        for (let item in customConfigs) {
            if (typeof customConfigs[item] === "object" && item in configs) {
                this.setConfig(configs[item], customConfigs[item])
            } else {
                configs[item] = customConfigs[item];
            }
        }
    }

    setInputs() {
        this.validatedInputsInfo = Array.from(this.form.querySelectorAll('input[data-validate]')).reduce((acc, input) => {
            acc.push({
                id: acc.length,
                input,
            })
            return acc
        }, []);
        this.validatedInputsInfo.forEach(info => {
            if (info.input.dataset.validate in this.configs.masks) {
                IMask(info.input, this.configs.masks[info.input.dataset.validate])
            }
        })
    }


    validate(info) {

        if (!'id' in info) {
            let existInfo = this.validatedInputsInfo.find(item => item.input == info);
            if (existInfo) {
                info = existInfo;
            } else {
                info = {
                    id: this.validatedInputsInfo.length + 1,
                    input: info,
                }
                this.validatedInputsInfo.push(info);
            }
        }

        let {id, input} = info;

        let inputRules = this.configs.rules[input.dataset.validate];
        if (!inputRules) {
            throw Error(`Правила для ${input.dataset.validate} не заданы`);
        }

        for (let item in inputRules) {
            if (!this[item]) {
                console.warn(`Нет обработчика для правила ${item}`);
                continue;
            }
            let result;
            if (typeof inputRules[item] === "object" && !Array.isArray(inputRules[item])) {
                let message = {
                    isValid: inputRules[item].isValid,
                    isInvalid: inputRules[item].isInvalid
                }
                result = this[item](inputRules[item].value, input, message);

            } else {
                result = this[item](inputRules[item], input);
            }

            let curInputIndex = this.invalidInputs.indexOf(this.invalidInputs.find(invalidInput => invalidInput.id == id));
            if (result) {
                if (curInputIndex > -1) {
                    this.invalidInputs.splice(curInputIndex, 1)
                }
            } else {
                if (curInputIndex == -1) {
                    this.invalidInputs.push({
                        id, input,
                        unfulfilledCondition: item
                    })
                } else {
                    this.invalidInputs[curInputIndex].unfulfilledCondition = item;
                }
                this.form.dispatchEvent(new CustomEvent('inputValidate', {
                    detail: {
                        input,
                        unfulfilledCondition: item
                    }
                }))
                return false;
            }
        }
        this.form.dispatchEvent(new CustomEvent('inputValidate', {
            detail: {
                input,
                unfulfilledCondition: false
            }
        }));
        return true
    }

    validateAll() {
        this.validatedInputsInfo.forEach(info => {
            this.validate(info)
        });
        this.form.dispatchEvent(new CustomEvent('allInputsValidate', {detail: this.invalidInputs}))
        return this.invalidInputs;
    }

    required(value, input, message = "Поле обязательно для заполнения") {
        if (value) {
            this.changeStatus(input.value.length > 0, input, message);
            return input.value.length > 0;
        }
        return true;
    }

    valueLength(value, input, message) {
        this.changeStatus(input.value.length === value, input, message);
        return input.value.length === value
    }

    minLength(value, input, message) {
        this.changeStatus(input.value.length >= value, input, message);
        return input.value.length >= value;
    }

    maxLength(value, input, message) {
        this.changeStatus(input.value.length <= value, input, message);
        return input.value.length <= value;
    }

    regexp(value, input, message) {
        this.changeStatus(!!input.value.match(value), input, message)
        return !!input.value.match(value);
    }

    customRules(arrayRules, input) {
        for (let i = 0; i < arrayRules.length; i++) {
            let result = arrayRules[i].fn(input);
            this.changeStatus(result, input, arrayRules[i].message);
            if (!result) {
                return false
            }
        }
        return true
    }

    changeStatus(flag, input, message) {
        let classTarget = this.configs.options.classTarget instanceof HTMLElement ? this.configs.options.classTarget : input.closest(this.configs.options.classTarget) || input.parentNode.querySelector(this.configs.options.classTarget);
        let feedbackContainer = this.configs.options.feedbackContainer instanceof HTMLElement ? this.configs.options.feedbackContainer : input.parentNode.querySelector(this.configs.options.feedbackContainer);
        if (flag) {
            classTarget.classList.remove(this.configs.options.errorClass);
            classTarget.classList.add(this.configs.options.validClass);
            feedbackContainer.classList.remove(this.configs.options.feedbackErrorClass)
            feedbackContainer.classList.add(this.configs.options.feedbackValidClass)
            if (feedbackContainer) {
                feedbackContainer.textContent = message.isValid;
            }
        } else {
            classTarget.classList.remove(this.configs.options.validClass);
            classTarget.classList.add(this.configs.options.errorClass);
            feedbackContainer.classList.remove(this.configs.options.feedbackValidClass)
            feedbackContainer.classList.add(this.configs.options.feedbackErrorClass)
            if (feedbackContainer) {
                feedbackContainer.textContent = message.isInvalid;
            }
        }
    }

    getInvalidInputs() {
        return this.invalidInputs;
    }
}