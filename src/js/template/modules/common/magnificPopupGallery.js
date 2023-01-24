/**
 * Модуль "Magnific Popup для галереи"
 */
import('./yalb')

export const magnificPopupGallery = async () => {
	document.querySelectorAll('.js-mp-gallery').forEach(mp=>{
		let galleryItems = mp.querySelectorAll('[src],[href]');
		let slides = Array.from(galleryItems).reduce((acc,item)=>{
			acc.push(item.getAttribute('src')||item.getAttribute('href'))
			return acc
		},[]);
		galleryItems.forEach(item=>{
			item.addEventListener('click',e=>{
				e.preventDefault();
				yalb(slides);
				yalb.show(slides.indexOf(item.getAttribute('src')||item.getAttribute('href')));
			})
		})
	})
};
