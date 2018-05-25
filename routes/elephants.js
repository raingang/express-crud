const express   = require('express');
const router    = express.Router();
let store       = require('../store');
const utils     = require('../utils');

router.get('/', (req, res) => {
  res.send(store);
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	const elephant = utils.getElementById(id, store);

	if (!elephant) {
		let err = new Error('Not Found');
		err.status = 404;
		return next(err);
	}

	res.status = 200;
	res.send(elephant);
});

router.post('/', (req, res, next) => {
	if (utils.validateBody(req.body)) {
		const name = req.body.name,
			latinName = req.body.latinName,
			weight = req.body.weight,
			height = req.body.height;

		const elephant = {
			id: utils.getNewId(store),
			name,
			latinName,
			weight,
			height,
		};

		store.push(elephant);
		res.status = 200;
		res.send(elephant);
	} else {
		let err = new Error('Bad Request');
		err.status = 400;
		next(err);
	}	
});	

router.put('/:id', (req, res, next) => {
	if (!utils.validateBody(req.body)) {
		const err = new Error('Bad Request');
		err.status = 400;
		return next(err);
	}

	const id  = req.params.id;
	let elephant = utils.getElementById(id, store);
	const index = utils.getIndexOfElement(id, store);

	if (!elephant) {
		const err = new Error('Not Found');
		err.status = 404;
		return next(err);
	}

	elephant = {...elephant, ...req.body};
	store.splice(index, 1, elephant);
	res.send(elephant);
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	const index = utils.getIndexOfElement(id, store);

	if (index === -1) {
		const err = new Error('Not Found');
		err.status = 404;
		return next(err);
	}

	store.splice(index);
	res.send({});
});

module.exports = router;
