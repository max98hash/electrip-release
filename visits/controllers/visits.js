const Car = require('../models/car');

exports.getCar = (req, res, next) => {
	Car.findById(req.params.id)
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}

exports.getCars = (req, res, next) => {
	Car.find()
    .then(cars => res.status(200).json(cars))
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

exports.modifyCar = (req, res, next) => {
	Car.findByIdAndUpdate(req.params.id,
		{ brand: req.body.brand, model: req.body.model,  years: req.body.years, matriculationNbr: req.body.matriculationNbr, 
        autonomy: req.body.autonomy}, {new: true}, 
        function (err, result) {
            if (err) 
                return res.status(400).json(err);
            else
                return res.status(201).json(result);
        }
    );
};

exports.deleteCar = (req, res, next) => {
    Car.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) 
                return res.status(400).json(err);
            else
                return res.status(201).json({ message: "car successfully deleted!", result });
    })
}

router.get('/:id', cars.getCar);
router.get('/', cars.getCars);
router.post('/create', cars.createCar);
router.put('/:id', cars.modifyCar);
router.delete('/:id', cars.deleteCar);