/**
 * Модуль "Возврат наверх"
 */

export const backToTop = () => {
	const backToTop = document.querySelector('.js-back-to-top');
	const shownClass = 'shown';
	let lastScrollTop = 0;

	backToTop.addEventListener('click',()=>{
		window.scrollTo(0,0)
	})

	window.addEventListener('scroll',function (){
		const scrollTop = this.scrollY;
		if (scrollTop > 1000) {
			if (lastScrollTop > scrollTop) {
				backToTop.classList.add(shownClass);
			} else {
				backToTop.classList.remove(shownClass);
			}
		} else {
			backToTop.classList.remove(shownClass);
		}

		lastScrollTop = scrollTop;
	})



};
