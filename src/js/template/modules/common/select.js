
const choicesList = [];
let allSelectorsAdded = false;
const getChoicesList = new Promise(resolve => {
    let interval = setInterval(() => {
        if (allSelectorsAdded) {
            clearInterval(interval)
            resolve(choicesList);
        }
    }, 100);
})



const select = async () => {
    let {default:ExtendedChoices} = await import('./extendedChoices');
    const baseOptions = {
        searchEnabled: false,
        searchChoices: false,
        itemSelectText: '',
        position: 'bottom',
        allowHTML:true
    }
    const multipleOptions = {
        removeItemButton: true,
        ...baseOptions,
    }
    document.querySelectorAll('.js-select').forEach(select => {
        let choice;
        if (select.getAttribute('multiple') !== null) {
            choice = new ExtendedChoices(select, multipleOptions)
        } else {
            choice = new ExtendedChoices(select, baseOptions)
        }
        choicesList.push(choice);
    });
    allSelectorsAdded = true;
}

export {select, getChoicesList}