/**
 * Модуль "popover"
 */

export const popover = async () => {
	const {Popover} = await import('bootstrap');
	let popoverList = [];
	document.querySelectorAll('[data-bs-toggle="popover"]').forEach(popover=>{
		popoverList.push(new Popover(popover));
	})
};