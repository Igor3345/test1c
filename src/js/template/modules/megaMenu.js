/**
 * Модуль "Мега-меню"
 */

export const megaMenu = () => {

	document.querySelectorAll('.js-mega-menu').forEach(mgMenu=>{
		mgMenu.addEventListener('mouseover',function (){
			document.querySelector(`#${this.dataset.megaMenuId}`).classList.add('active');
		})
		mgMenu.addEventListener('mouseout',function (){
			document.querySelector(`#${this.dataset.megaMenuId}`).classList.remove('active');
		})
	})

	// реализуем активность соответствующей ссылки при открытом мега-меню
	document.querySelectorAll('.mega-menu').forEach(mgMenu=>{
		mgMenu.addEventListener('mouseover',function (){
			document.querySelector(`[data-mega-menu-id="${this.getAttribute('id')}"]`).classList.add('active');
		})
		mgMenu.addEventListener('mouseout',function (){
			document.querySelector(`[data-mega-menu-id="${this.getAttribute('id')}"]`).classList.remove('active');
		})
	})

};
