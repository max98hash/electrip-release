const Traject = require('../models/traject');
const mongoose = require('mongoose');

/*exports.getTraject = (req, res, next) => {
	Car.findById(req.params.id)
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}*/

exports.getTrajects = (req, res, next) => {
    let userId = req.params.userId;
	Traject.find({userId: userId})
    .then(trajects => res.status(200).json(trajects))
    .catch(error => res.status(400).json({ error }));
}

exports.getTrajectsBetweenDates = (req, res, next) => {
    let userId = req.params.userId;
    let dateBeg = Date.parse(req.params.dateBeg);
    let dateEnd = Date.parse(req.params.dateEnd);
    var trajectsFinal = []
	Traject.find({userId: userId})
    .then(trajects => res.status(200).json(trajects.filter(data => (Date.parse(data.date) > dateBeg) && (Date.parse(data.date) < dateEnd))))
    .catch(error => res.status(400).json({ error }));
}

exports.createTraject = (req, res, next) => {
    delete req.body._id;
    console.log("données reçues : " + req.body);
	const traject = new Traject({
		...req.body
	});
	traject.save()
		.then(() => res.status(201).json(traject))
		.catch(error => res.status(400).json({ error }));
}

/*exports.modifyCar = (req, res, next) => {
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
}*/;

exports.deleteTraject = (req, res, next) => {
    Traject.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) 
                return res.status(400).json(err);
            else
                return res.status(201).json({ message: "traject successfully deleted!", result });
    })
}