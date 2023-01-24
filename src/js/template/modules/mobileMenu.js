/**
 * Модуль "Мобильное меню"
 */

export const mobileMenu = () => {
    const menuBar = document.querySelector('.js-menu-bar');
    const togglingClass = 'mobile-menu_active';
    const activeClass = 'active';

    document.addEventListener('click', e => {
        if (e.target.closest('.js-menu-bar') || e.target.closest('.mobile-menu__backdrop')) {
            document.body.classList.toggle(togglingClass);
            menuBar.classList.toggle(activeClass);
        }
    })

    window.addEventListener('resize', function () {
        if (document.body.classList.contains(togglingClass)) {
            if (this.innerWidth >= 992) {
                document.body.classList.remove(togglingClass);
                menuBar.classList.remove(activeClass)
            }
        }
    })


};
