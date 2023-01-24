/**
 * Модуль "Datepicker"
 */

const datepickerList = [];
let allDatepickerAdded = false;
const getDatepickerList = new Promise(resolve => {
    let interval = setInterval(() => {
        if (allDatepickerAdded) {
            clearInterval(interval)
            resolve(datepickerList);
        }
    }, 100);
})

const datepicker = async () => {
    let {default: IMask} = await import('imask/esm/imask');
    let {default:Litepicker} = await import('litepicker')
    document.querySelectorAll('.js-datepicker').forEach(input => {
        datepickerList.push(new Litepicker({
            element:input,
            format:"DD.MM.YYYY",
            lang:"ru-Ru",
            minDate:"01.01.1900"
        }));

        IMask(input, {
            mask: Date,
            pattern: 'd.`m.`Y',
            blocks: {
                d: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 31,
                    maxLength: 2,
                },
                m: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 12,
                    maxLength: 2,
                },
                Y: {
                    mask: IMask.MaskedRange,
                    from: 1900,
                    to: 9999,
                    maxLength: 4
                }
            },

        });
    })
    allDatepickerAdded = true
};

export {datepicker, getDatepickerList}