/**
 * Модуль "Аккордеон"
 */

export const accordion = () => {
	const togglingClass = 'panel-shadow';
	const toggleClass = function (){
		this.closest('.panel').classList.toggle(togglingClass);
	}

	document.querySelectorAll('.js-accordion').forEach(accordion=>{
		accordion.querySelectorAll('.panel-collapse').forEach(collapseBlocks=>{
			let handler = toggleClass.bind(collapseBlocks);
			collapseBlocks.addEventListener('show.bs.collapse',handler)
			collapseBlocks.addEventListener('hide.bs.collapse',handler)
		})
	})

};
