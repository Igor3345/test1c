/**
 * Модуль для работы с Cookie
 */

export const indiCookie = {

	/**
	 * Устанавливает значение Cookie
	 * @param name
	 * @param value
	 * @param time
	 * @param path
	 */
	set(name, value, time, path) {
		time = time === undefined ? 0 : time;
		path = path === undefined ? '/' : path;

		const expires = new Date();
		time = expires.getTime() + time * 1000;
		expires.setTime(time);

		document.cookie = `${name}=${value}; expires=${expires.toGMTString()}; path=${path}`;
	},

	/**
	 * Получает значение Cookie
	 * @param name
	 * @returns {null}
	 */
	get(name) {
		const cookie = ` ${document.cookie}`;
		const search = ` ${name}=`;

		let setStr = null;
		let offset = 0;
		let end = 0;

		if (cookie.length > 0) {
			offset = cookie.indexOf(search);

			if (offset != -1) {
				offset += search.length;
				end = cookie.indexOf(';', offset);

				if (end == -1) {
					end = cookie.length;
				}

				setStr = unescape(cookie.substring(offset, end));
			}
		}

		return setStr;
	}
};
