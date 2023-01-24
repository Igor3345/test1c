/**
 * Модуль "Табы на мобильном (в селект)"
 */

export const tabsToSelect = () => {
	document.querySelectorAll('.js-tab-select').forEach(select=>{
		select.addEventListener('change',function (){
			document.querySelector(`[data-bs-toggle="tab"][href="${this.value}"]`).dispatchEvent(new Event('click'));
		});
	})
};
