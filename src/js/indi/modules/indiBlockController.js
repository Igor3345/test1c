/**
 * Модуль контроллера блоков, управляющего загрузкой js-кода,
 * необходимого для DOM элементов текущей страницы
 */

export const indiBlockController = {

    /**
     * Аккумулятор контроллера блоков
     */
    blocks: {},

    /**
     * Метод проверки существования элемента DOM на текущей странице
     * @param domElement
     * @returns {boolean|number}
     */
    exist(domElement) {
        return document.querySelectorAll(domElement).length;
    },

    /**
     * Метод инициализации блока контроллера
     * @param domElement
     */
    init(domElement) {

        if (this.exist(domElement)) {
            this.blocks[domElement]();
            let domElems = document.querySelectorAll(domElement)
            for (let i = 0; i < domElems.length; i++) {
                domElems[i].setAttribute('data-individ-init', "");
            }
        }
    },

    /**
     * Метод переинициализации всех блоков контроллера
     */
    initAll() {
        for (let block in this.blocks) {
            this.init(block);
        }
        const {body} = document;

        body.addEventListener("initAll", event=> {
            this.initAll();
        });
        body.addEventListener("reInit", event=> {
            this.reInitAll();
        });
        //Вызывается new CustomEvent, а не new Event!!!! document.body.dispatchEvent(new CustomEvent('reInitBlock', {detail:{selector:".header"}}))
        //В данном случае вызывается функиця, которая проверяет и при неоходимости инициализирует скрипты внутри блоков с одинаковыми классами.
        body.addEventListener("reInitBlocks", event=>{
            this.reInitBlocks();
        });
        //Функция, которая проверяет и при необходимости инициализирует скрипты в 1 блоке.
        body.addEventListener("reInitBlock", event=> {
            this.reInitBlock();
        });
    },

    reInitAll() {
        for (let block in this.blocks) {
            const element = document.querySelector(block)
            if (element) {
                const initElement = element.hasAttribute('data-individ-init')
                if (!initElement) {
                    this.init(block)
                }
            }
        }
    },

    reInitBlocks(selectors) {
        selectors = selectors || event.detail.selectors;
        let items
        if (Array.isArray(selectors)) {
            items = selectors
            items.forEach(item => {
                let obj = document.querySelectorAll(item);
                for (let block in this.blocks) {
                    for (let i = 0; i < obj.length; i++) {
                        const element = obj[i].querySelector(block)
                        if (element) {
                            const initElement = element.hasAttribute('data-individ-init')
                            if (!initElement) {
                                this.init(block)
                            }
                        }
                    }
                }
            })
        } else {
            items = document.querySelectorAll(selectors);
            items.forEach(item => {
                for (let block in this.blocks) {
                    const element = item.querySelector(block)
                    if (element) {
                        const initElement = element.hasAttribute('data-individ-init')
                        if (!initElement) {
                            this.init(block)
                        }
                    }
                }
            })
        }
    },

    reInitBlock(selector) {
        const item = document.querySelector(selector || event.detail.selector);
        for (let block in this.blocks) {
            const element = item.querySelector(block)
            if (element) {
                const initElement = element.hasAttribute('data-individ-init')
                if (!initElement) {
                    this.init(block)
                }
            }
        }
    },


    /**
     * Метод добавления блока в контроллер
     * @param block
     * @param domElement
     */
    add(block, domElement) {
        if (block && domElement) {
            this.blocks = {
                ...this.blocks,
                [domElement]: block
            };
        }
    }
};
