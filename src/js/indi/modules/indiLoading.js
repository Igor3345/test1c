/**
 * Модуль индикатора загрузки
 */

export class indiLoading {
    constructor() {
        if(typeof indiLoading.instance !== 'object'){
            indiLoading.instance = this;
            const {body} = document;
            body.addEventListener("startLoader", event => {
                this.show();
            });
            body.addEventListener("endLoader", event => {
                this.hide();
            });
        }
        return indiLoading.instance;
    }

    /**
     * Показывает индикатор загрузки
     *
     * @return void
     */
    show(selector = document.body) {
        selector.classList.add('loading-indicator');
        let layer = document.createElement('div');
        layer.classList.add('loading-layer');
        let icon = document.createElement('img');
        icon.classList.add('loading-icon');
        icon.src = "data:image/svg+xml,%3C%3Fxml version=\'1.0\' encoding=\'UTF-8\' standalone=\'no\'%3F%3E%3Csvg xmlns:svg=\'http://www.w3.org/2000/svg\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' version=\'1.0\' width=\'64px\' height=\'64px\' viewBox=\'0 0 128 128\' xml:space=\'preserve\'%3E%3Cg%3E%3Ccircle cx=\'16\' cy=\'64\' r=\'16\' fill=\'%23000000\'/%3E%3Ccircle cx=\'16\' cy=\'64\' r=\'16\' fill=\'%23555555\' transform=\'rotate(45,64,64)\'/%3E%3Ccircle cx=\'16\' cy=\'64\' r=\'16\' fill=\'%23949494\' transform=\'rotate(90,64,64)\'/%3E%3Ccircle cx=\'16\' cy=\'64\' r=\'16\' fill=\'%23cccccc\' transform=\'rotate(135,64,64)\'/%3E%3Ccircle cx=\'16\' cy=\'64\' r=\'16\' fill=\'%23e1e1e1\' transform=\'rotate(180,64,64)\'/%3E%3Ccircle cx=\'16\' cy=\'64\' r=\'16\' fill=\'%23e1e1e1\' transform=\'rotate(225,64,64)\'/%3E%3Ccircle cx=\'16\' cy=\'64\' r=\'16\' fill=\'%23e1e1e1\' transform=\'rotate(270,64,64)\'/%3E%3Ccircle cx=\'16\' cy=\'64\' r=\'16\' fill=\'%23e1e1e1\' transform=\'rotate(315,64,64)\'/%3E%3CanimateTransform attributeName=\'transform\' type=\'rotate\' values=\'0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64\' calcMode=\'discrete\' dur=\'720ms\' repeatCount=\'indefinite\'%3E%3C/animateTransform%3E%3C/g%3E%3C/svg%3E";
        selector.append(layer);
        selector.append(icon);
    };

    /**
     * Скрывает индикатор загрузки
     *
     * @return void
     */
    hide(selector = document.body) {
        selector.classList.remove('loading-indicator');
        selector.querySelector('.loading-layer').remove();
        selector.querySelector('.loading-icon').remove();
    };

};
