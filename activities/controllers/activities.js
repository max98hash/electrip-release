const Activity = require('../models/activities');

exports.getActivity = (req, res, next) => {
	Activity.findById(req.params.id)
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
}

exports.getActivities = (req, res, next) => {
    let userId = req.userId;
	Activity.find({userId: userId})
    .then(activities => res.status(200).json(activities))
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

exports.modifyActivity = (req, res, next) => {
	Activity.findByIdAndUpdate(req.params.id,
		{ name: req.body.name, description: req.body.description,  start: req.body.start, end: req.body.end, 
        category: req.body.category, userId: req.body.userId}, {new: true}, 
        function (err, result) {
            if (err) 
                return res.status(400).json(err);
            else
                return res.status(201).json(result);
        }
    );
};

exports.deleteActivity = (req, res, next) => {
    Activity.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) 
                return res.status(400).json(err);
            else
                return res.status(201).json({ message: "event successfully deleted!", result });
    })
}