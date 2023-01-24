/**
 * Модуль "Переключатель для поля ввода пароля"
 */

const toggle = (field, state) => {
	const togglingClass = 'icon-eye-closed';
	const fieldState = {
		shown: 'text',
		hidden: 'password'
	};

	if(state.classList.contains(togglingClass)){
		field.setAttribute('type', fieldState.hidden);
	}else {
		field.setAttribute('type', fieldState.shown);
	}

	state.classList.toggle(togglingClass);
};

export const dropEye =  () => {
	document.querySelectorAll('.js-drop-eye').forEach(eye=>{
		eye.addEventListener('click',()=>{
			let dropEyeIcon = eye.querySelector('.icon-eye');
			let passwordField = eye.closest('.custom-group').querySelector('input');
			toggle(passwordField,dropEyeIcon)
		})
	})

};
