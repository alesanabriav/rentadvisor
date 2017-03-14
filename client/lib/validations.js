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

function runValidation(rule, param) {
	let patt = new RegExp('([A-Z]+)(:)([0-9]+)', 'i');
	if(patt.test(rule)) {
		let r = rule.split(':');
		let func = r[0];
		let funcParam = r[1];
		return validations[func] ? validations[func](param, funcParam) : false;
	}

	return validations[rule] ? validations[rule](param) : false;
}

export function validate(errors = {}, rules = {}, fields = {}) {
		let errs = {};
	
		const runValidations = Object.keys(errors)
			.map(field => {

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

