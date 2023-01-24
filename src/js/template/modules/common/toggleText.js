/**
 * Модуль "Переключение текста при клике"
 */

export const toggleText = () => {
	document.querySelectorAll('.js-toggle-text').forEach(item=>{
		item.addEventListener('click',function (){
			let text = this.dataset.text;
			this.dataset.text = this.textContent;
			this.textContent = text
		})
	})
};
