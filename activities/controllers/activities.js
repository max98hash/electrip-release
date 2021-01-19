const Activity = require('../models/activities');

exports.getActivity = (req, res, next) => {
	Activity.findById(req.params.id)
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}

exports.getActivities = (req, res, next) => {
    let userId = req.userId;
	Activity.find({userId: userId})
    .then(cars => res.status(200).json(cars))
    .catch(error => res.status(400).json({ error }));
}

exports.createActivity = (req, res, next) => {
    delete req.body._id;
    const activityJSON = {...req.body};
    activityJSON['userId'] = req.userId;
	const activity = new Activity(activityJSON);
	activity.save()
		.then(() => res.status(201).json(activity))
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
};*/

exports.deleteActivity = (req, res, next) => {
    Activity.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) 
                return res.status(400).json(err);
            else
                return res.status(201).json({ message: "event successfully deleted!", result });
    })
}