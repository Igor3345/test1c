/**
 * Модуль "Отправка формы AJAX"
 */

import {indiBlockController,indiLoading} from '../../../indi';
import axios from "axios"
import Validator from "./validator";

export const ajaxForm = function () {

    this.send = async function (form) {
        const formData = new FormData(form);
        const container = form.closest('.js-ajax-form');
        const containerId = container.getAttribute('id');
        let loading = new indiLoading();
        loading.show()
        const action = container.getAttribute('action') ? container.getAttribute('action') : form.getAttribute('action');
        let result = await axios({
            url: action,
            method: form.getAttribute('method'),
            processData: false,
            contentType: false,
            data: formData
        })
        let html = new DOMParser().parseFromString(result.data, 'text/html').querySelector(`#${containerId}`);
        container.innerHTML = html.outerHTML;
        indiBlockController.reInitBlock(`#${containerId}`);
        loading.hide()

        const re = container.querySelector('.g-recaptcha');
        if (!!re) {
            const reId = re.getAttribute('id');
            grecaptcha.render(reId, {
                'sitekey': container.querySelector('.g-recaptcha').dataset.sitekey
            });
        }

        if (!!container.querySelector('.notification')) {
            window.scrollTo(0, container.querySelector('.notification').offsetTop)
        }
        return false;
    };


    document.querySelectorAll('.js-ajax-form').forEach(form => {
       let validator =  new Validator(form);
       form.addEventListener('submit',e=>{
           e.preventDefault();
           if(validator.validateAll().length ==0){
             return this.send(form);
           }
       })
    })
};
