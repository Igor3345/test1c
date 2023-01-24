/**
 * Модуль "Ввод цифр в input"
 */

export const inputDigits = async () => {
    const {default: IMask} = await import('imask/esm/imask');
    const regex = new RegExp("^[0-9]+$");
    document.querySelectorAll('.js-input-digits').forEach(input => {
        const maskOptions = {
            mask: regex,
        };
        const mask = IMask(input, maskOptions);
    })
}

