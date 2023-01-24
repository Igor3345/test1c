/**
 * Модуль, склоняющий существительное с числительным
 */

export const indiNumEnding = (number, cases, incNum) => {
	let numberMod = number % 100;
	incNum = incNum === undefined ? true : incNum;
	let result = '';

	if (numberMod >= 11 && numberMod <= 19) {
		result = cases[2];
	} else {
		numberMod = numberMod % 10;
		switch (numberMod) {
			case 1:
				result = cases[0];
				break;
			case 2:
			case 3:
			case 4:
				result = cases[1];
				break;
			default:
				result = cases[2];
		}
	}

	return incNum ? `${number} ${result}` : result;
};
