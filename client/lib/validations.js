export function isNotEmail(email) {
	const re = /\S+@\S+\.\S+/;
	return !re.test(email);
}

export function isEmpty(str) {
	const re = /([^\s])/;
	return !re.test(str);
}