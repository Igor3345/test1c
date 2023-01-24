/**
 * Модуль "Инициализация маски для телефонов"
 */

export const phonemask = async () => {
	const {default: IMask} = await import('imask');
	document.querySelectorAll('input[type="tel"]').forEach(inputTel => {
		const maskOptions = {
			mask: '+{7} (000) 000-00-00',
		};
		const mask = IMask(inputTel, maskOptions);
	})
};
