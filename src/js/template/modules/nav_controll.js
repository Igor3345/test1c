export const nav_controll = () => {

    const buttons = document.querySelectorAll('.js-controll_button');
    const list = document.querySelector('.js-nav_list');
    const nav = document.querySelector('.js-nav_controll');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = controll
    }

    function controll(e) {
        let target = e.currentTarget;
        let left = document.querySelector('.js-left');
        let right = document.querySelector('.js-right');

        if (target.getAttribute("data-side") === 'right') {

            list.scrollLeft += 150;

            if (list.clientWidth + list.scrollLeft === list.scrollWidth) {
                right.classList.add('--invisible');
            }

            left.classList.remove('--invisible');

        } else {
            list.scrollLeft -= 150;

            if (list.scrollLeft === 0) {

                left.classList.add('--invisible');
            }

            if (list.clientWidth + list.scrollLeft != list.scrollWidth) {
                right.classList.remove('--invisible');
            }
        }

    }

}