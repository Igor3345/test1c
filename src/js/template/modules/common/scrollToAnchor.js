/**
 * Модуль "Плавный переход к якорю"
 */

export const scrollToAnchor = () => {
	document.querySelectorAll('.js-to-anchor').forEach(anchor=>{
		anchor.addEventListener('click',function (e){
			e.preventDefault();
			const id = this.getAttribute('href') ;
			const top = document.querySelector(id).getBoundingClientRect().y - (this.dataset.offset || 0);
			window.scrollTo(0,pageYOffset+top);
		})
	})
};
