/**
 * Модуль "Magnific Popup для изображений"
 */
import "./yalb"

export const magnificPopupImage = async () => {

    document.querySelectorAll('.js-mp-image').forEach(mp => {
        mp.addEventListener('click', (e) => {
            e.preventDefault();
            yalb([mp.getAttribute('src') || mp.getAttribute('href')]);
        })
    })
};
