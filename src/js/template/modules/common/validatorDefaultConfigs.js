import {regexp} from "autoprefixer/lib/utils";

export const defaultConfigs = {
    rules: {
        inn: {
            required: {
                value:true,
                isInvalid: 'Поле обязательно для заполнения',
                isValid:'Ok'
            },
            regexp: {
                value: new RegExp('^([0-9]{10}|[0-9]{12})$'),
                isInvalid: 'Неверно указан ИНН',
                isValid:'Ok'
            }
        },
        kpp: {
            required: {
                value:true,
                isInvalid: 'Поле обязательно для заполнения',
                isValid:'Ok'
            },
            regexp: {
                value: new RegExp('^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$'),
                isInvalid: 'Неверно указан КПП',
                isValid:'Ok'
            }
        },
        email: {
            required: {
                value:true,
                isInvalid: 'Поле обязательно для заполнения',
                isValid:'Ok'
            },
            regexp: {
                value: new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*.[a-z]{2,6}$'),
                isInvalid: 'Неверно указан email',
                isValid:'Ok'
            }
        },
        lat: {
            regexp: {
                value: new RegExp('^([a-zA-Z0-9]||\s*)+$'),
                isInvalid: 'Поле может содержать только цифры и латиницу',
                isValid:'Ok'
            }
        },
        'cyr-lat': {
            regexp: {
                value: new RegExp('^([а-яА-ЯёЁa-zA-Z0-9]||\s*)+$'),
                isInvalid: 'Поле может содержать только цифры, латиницу и кириллицу',
                isValid:'Ok'
            }
        },
        'tel':{
            required: {
                value:true,
                isInvalid: 'Поле обязательно для заполнения',
                isValid:'Ok'
            },
            minLength:{
                value:18,
                isInvalid: 'Телефон должен содержать 10 цифр',
                isValid:'Ok'
            }
        }
    },
    options: {
        errorClass: 'is-invalid',
        validClass:'is-valid',
        classTarget: '.form-control',
        feedbackContainer: '.feedback',
        feedbackErrorClass:'invalid-feedback',
        feedbackValidClass:'valid-feedback'
    },
    masks: {
        inn: {
            mask: new RegExp('^[0-9]{1,12}$')
        },
        kpp: {
            mask: function (value) {
                if (value.length == 5 || value.length == 6) {
                    if (!value[value.length - 1].match(new RegExp('^[0-9A-Z]+$'))) {
                        return false;
                    }
                } else if (!value[value.length - 1].match(new RegExp('^[0-9]+$'))) {
                    return false;
                }
                return !(value.length > 9);
            }
        },
        lat: {
            mask: new RegExp('^[a-zA-Z0-9]+$')
        },
        'cyr-lat': {
            mask: new RegExp('^[а-яА-ЯёЁa-zA-Z0-9]+$')
        },
        tel:{
            mask: '+{7} (000) 000-00-00'
        }
    }
}