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
	return str.length > num;
}

 const validations = {
	isEmail,
	isEmpty,
	containsNumber,
	higherThen
};

export function validate(errors = {}, rules = {}, fields = {}) {
		let errs = {};
	
		const runValidations = Object.keys(errors)
			.map(field => {
				let val;
				rules[field].split('|').forEach(rule => {
					if(/:/)
					val = validations[rule] ? validations[rule](fields[field]) : false;
				});

				errs = {...errs, [field]: val};
				return val;
		});

		return {
			errors: errs,
			promise: Promise.all(runValidations)
		};
}

