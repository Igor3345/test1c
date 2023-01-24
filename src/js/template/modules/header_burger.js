export const header_burger = () => {
    const open = document.querySelector('.js-burger_open');
    const close = document.querySelector('.js-burger_close');
    const catalog = document.querySelector('.js-header_burger');
    const body = document.querySelector('body');


    open.onclick = () => {
        catalog.classList.add('--open');
    }

    close.onclick = () => {
        catalog.classList.remove('--open');
    }

    window.addEventListener('resize', function () {

        if (body.clientWidth > 575) {
            close.click();
        }
    })
}