/**
 * Модуль User agent'а пользователя
 */

export const indiUserAgent = {

	/**
	 * User agent - iPhone
	 */
	isIPhone: /iPhone/.test(navigator.userAgent),

	/**
	 * User agent - iPad
	 */
	isIPad: /iPad/.test(navigator.userAgent),

	/**
	 * User agent - iPod
	 */
	isIPod: /iPod/.test(navigator.userAgent),

	/**
	 * User agent - iOS
	 */
	isIOS() {
		return this.isIPhone || this.isIPad || this.isIPod
	},

	/**
	 * User agent - Android
	 */
	isAndroid: /Android/.test(navigator.userAgent),

	/**
	 * для Touch
	 */
	isTouch() {
		return this.isIOS() || this.isAndroid;
	},

	/**
	 * User agent работает на WebKit
	 */
	isWebKit: /WebKit/.test(navigator.userAgent)
};
