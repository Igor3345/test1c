import Choices from 'choices.js';

export default class ExtendedChoices extends Choices {
    constructor(input, options) {

        if (typeof input === 'string') {
            throw new Error("Первым входным параметром должен передаваться input")
        }
        let selectOptions = Array.from(input.querySelectorAll('option'));
        super(input, options);
        this.extendInit = false;
        this.selectOptions = selectOptions;
        this.setDataAttributes();
        input.addEventListener('change', () => this.setDataAttributes())
        input.choice = this;
        this.extendInit = true;
    }

    setDataAttributes() {
        this._store.activeItems.forEach(activeItem => {
            let option = this.selectOptions.find(option => option.value == activeItem.value);
            let element = this.containerInner.element.querySelector(`.choices__item[data-id="${activeItem.id}"]`);
            if (option.dataset) {
                for (let item in option.dataset) {
                    element.dataset[item] = option.dataset[item];
                }
                activeItem.dataset = {...option.dataset}
            }
        })

        if(this.extendInit && this.input.type == "select-one" && this._store.activeItems[0].dataset.href){
            window.open(this._store.activeItems[0].dataset.href,'_blank')
        }
    }
}