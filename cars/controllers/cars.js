const Visit = require('../models/visit');

exports.getVisit = (req, res, next) => {
	Visit.findById(req.params.id)
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}

exports.getVisits = (req, res, next) => {
	Visit.find()
    .then(visits => res.status(200).json(visits))
    .catch(error => res.status(400).json({ error }));
}

exports.createVisits = (req, res, next) => {
	delete req.body._id;
	const visit = new Visit({
		...req.body
	});
	visit.save()
		.then(() => res.status(201).json(visit))
		.catch(error => res.status(400).json({ error }));
}

exports.modifyVisit = (req, res, next) => {
	Visit.findByIdAndUpdate(req.params.id,
		{ name: req.body.name, address: req.body.address,  latitude: req.body.latitude, longitude: req.body.longitude, 
            date: req.body.date}, {new: true}, 
        function (err, result) {
            if (err) 
                return res.status(400).json(err);
            else
                return res.status(201).json(result);
        }
    );
};

exports.deleteVisit = (req, res, next) => {
    Visit.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) 
                return res.status(400).json(err);
            else
                return res.status(201).json({ message: "visit successfully deleted!", result });
    })
}

router.get('/:id', visits.getVisit);
router.get('/', visits.getVisits);
router.post('/create', visits.createVisit);
router.put('/:id', visits.modifyVisit);
router.delete('/:id', visits.deleteVisit);