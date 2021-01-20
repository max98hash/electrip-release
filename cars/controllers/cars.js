const Car = require('../models/car');

exports.getCar = (req, res, next) => {
	Car.findById(req.params.id)
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}

exports.getCars = (req, res, next) => {
    let userId = req.userId;
	Car.find({userId: userId})
    .then(cars => res.status(200).json(cars))
    .catch(error => res.status(400).json({ error }));
}

exports.createCar = (req, res, next) => {
    delete req.body._id;
    const carJSON = {...req.body};
    carJSON['userId'] = req.userId;
	const car = new Car(carJSON);
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