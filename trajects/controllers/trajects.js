const Traject = require('../models/traject');
const mongoose = require('mongoose');

exports.getTraject = (req, res, next) => {
	Traject.findById(req.params.id)
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}

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

exports.modifyTraject = (req, res, next) => {
    Traject.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        startCoord: req.body.startCoord,
        startName: req.body.startName,
        endCoord: req.body.endCoord,
        endName: req.body.endName,
        userId: req.body.userId,
        distance: req.body.distance,
        date : req.body.date,
        carId: req.body.carId,
        carName: req.body.carName,
        stations: req.body.stations}, {new: true},
        function (err, result) {
            if (err) 
                return res.status(400).json(err);
            else
                return res.status(201).json(result);
        }
    );
};

exports.deleteTraject = (req, res, next) => {
    Traject.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) 
                return res.status(400).json(err);
            else
                return res.status(201).json({ message: "traject successfully deleted!", result });
    })
}