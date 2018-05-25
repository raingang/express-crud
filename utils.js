const getElementById = (id, arr) => {
	return arr.find((item) => item.id === id);
}

const getNewId = (store) => {
	return `${store.length ? +store[store.length - 1].id + 1 : 0}`;
}

const getIndexOfElement = (id, arr) => {
	const elem = getElementById(id, arr);
	return arr.indexOf(elem);
}

module.exports = {
	getElementById,
	getNewId,
	getIndexOfElement,
}