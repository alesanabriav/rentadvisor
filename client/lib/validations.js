export function isNotEmail(email) {
	const reg = /\S+@\S+\.\S+/;
	return !reg.test(email);
}

export function isEmpty(str) {
	const reg = /([^\s])/;
	return !reg.test(str);
}

export function isNotPhone(phone) {
	const reg = /((\(.*\))|([0-9]))/;
	return !reg.test(phone); 
}
