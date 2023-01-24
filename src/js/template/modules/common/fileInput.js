/**
 * Модуль "Bootstrap custom file input"
 */

export const fileInput = async () => {
	const inputs = document.querySelectorAll('.form-file-input');
	inputs.forEach((input) => {
		const label = input.nextElementSibling,
			labelVal = label.innerHTML;
		input.addEventListener('change', function (e) {
			let fileName = 'Выбрано {count}';

			if (this.files && this.files.length > 1)
            {
                fileName = (this.getAttribute('data-multiple-caption') || fileName).replace('{count}', this.files.length);
                console.log(this.getAttribute('data-multiple-caption'))
            }
			else
				fileName = e.target.value.split("\\").pop();
			if (fileName) {
				const text = label.querySelector('.form-file-text')
				if (fileName) {
					text.innerHTML = fileName
				} else {
					text.innerHTML = input.getAttribute('placeholder')
				}
			} else
				label.innerHTML = labelVal;
		});
		input.addEventListener('focus', () => input.classList.add('has-focus'));
		input.addEventListener('blur', () => input.classList.remove('has-focus'));
	});
};