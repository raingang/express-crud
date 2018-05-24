const express   = require('express');
const router    = express.Router();

const store     = require('../store');
const utils     = require('../utils');

router.get('/', (req, res, next) => {
  res.send(store);
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	const elephant = utils.getElementById(id, store);

	if (!elephant) {
		let err = new Error('Not Found');
		err.status = 404;
		next(err);
	} 

	res.status = 200;
	res.send(elephant);
});

router.post('/', (req, res, next) => {
	const name = req.body.name,
		latinName = req.body.latinName,
		weight = req.body.weight,
		height = req.body.height;

	if ( name && latinName && weight && height) {
		const elephant = {
		id: utils.getNewId(store),
		name,
		latinName,
		weight,
		height,
		} 

		store.push(elephant);
		res.status = 200;
		res.send(elephant);
	} else {
		let err = new Error('Bad data');
		err.status = 401;
		next(err);
	}	
});	

module.exports = router;
