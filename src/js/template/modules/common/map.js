import axios from "axios"

export const map = async () => {
    let result = await axios('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=449c4cf2-f0fb-4ffb-9a94-d43279f6e499');
    new Function([], result.data)();
    document.querySelectorAll('.js-map').forEach(map => {
        let {center, iconData, placemarks} = JSON.parse(map.dataset.map);
        ymaps.ready(() => {
            let myMap = new ymaps.Map(map, {
                    center: center,
                    zoom: 16.4,
                    controls: ['zoomControl'],
                }, {
                    searchControlProvider: 'yandex#search'
                }),

                // Создаём макет содержимого.
                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                );

            placemarks.forEach(placemark => {
                myMap.geoObjects.add(new ymaps.Placemark(placemark.coordinates, {
                    balloonContent: placemark.balloonContent
                }, {
                    ...iconData,
                    iconContentLayout: MyIconContentLayout,
                }))
            })

        });
    })

}