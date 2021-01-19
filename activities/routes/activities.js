const express = require('express');
const router = express.Router();

const activities = require('../controllers/activities');

const auth = require('../middlewares/auth');

router.get('/:id', auth, activities.getActivity);
router.post('/create', auth, activities.createActivity);
//router.put('/:id', auth, cars.modifyCar);
router.delete('/:id', auth, activities.deleteActivity);
router.get('/', auth, activities.getActivities);

module.exports = router;