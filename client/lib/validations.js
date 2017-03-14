function isEmail(email) {
	const reg = /\S+@\S+\.\S+/;
	return !reg.test(email);
}

function isEmpty(str) {
	const reg = /([^\s])/;
	return !reg.test(str);
}

function containsNumber(phone) {
	const reg = /\d/;
	return !reg.test(phone); 
}

function higherThen(str, num) {
	return str.length < num;
}

 const validations = {
	isEmail,
	isEmpty,
	containsNumber,
	higherThen
};

function runValidation(ruleName, param) {
	let patt = new RegExp('([A-Z]+)(:)([0-9]+)', 'i');

	if(patt.test(ruleName)) {
		let r = ruleName.split(':');
		let funcName = r[0];
		let funcParam = r[1];
		return validations[funcName] ? validations[funcName](param, funcParam) : false;
	}

	return validations[ruleName] ? validations[ruleName](param) : false;
}

export function validate(rules = {}, fields = {}) {
		let errs = {};
		const names = Object.keys(rules);
		const runValidations = names.map(field => {
			let val = rules[field].split('|').map(rule => {
				return runValidation(rule, fields[field]);
			});

			let isValid = !val.every(item => item == false);

			errs = {...errs, [field]: isValid};
			return val;
		});

		return {
			errors: errs,
			isValid: runValidations.every(item => item == false)
		};
}

