/**
 * Модуль "Datepicker"
 */

const datepickerRangeList = [];
let allDatepickerAdded = false;
const getDatepickerRangeList = new Promise(resolve => {
    let interval = setInterval(() => {
        if (allDatepickerAdded) {
            clearInterval(interval)
            resolve(datepickerRangeList);
        }
    }, 100);
})

const datepickerRange = async () => {
    let {default: Litepicker} = await import('litepicker')

    document.querySelectorAll('.js-datepicker-range').forEach(input => {
        datepickerRangeList.push(new Litepicker({
            element: input,
            format: "DD.MM.YYYY",
            lang: "ru-Ru",
            singleMode: false,
            numberOfColumns: 2,
            numberOfMonths: 2,
            minDate: "01.01.1900"
        }))
        input.setAttribute('readonly',true)
    })
    allDatepickerAdded = true
};

export {datepickerRange, getDatepickerRangeList}