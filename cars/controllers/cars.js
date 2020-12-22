const Car = require('../models/car');
const mongoose = require('mongoose');

exports.getCars = (req, res, next) => {
	Car.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}

exports.createCars = (req, res, next) => {
	delete req.body._id;
	const car = new Car({
		...req.body
	});
	car.save()
		.then(() => res.status(201).json(car))
		.catch(error => res.status(400).json({ error }));
}