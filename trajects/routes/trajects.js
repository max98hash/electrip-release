const express = require('express');
const router = express.Router();

const trajects = require('../controllers/trajects');

//const auth = require('../middleware/auth');

//router.get('/:id', cars.getCar);
router.get('/user/:userId', trajects.getTrajects);
router.post('/create', trajects.createTraject);
//router.put('/:id', cars.modifyCar);
router.delete('/:id', trajects.deleteTraject);

router.get('/user/:userId/:dateBeg/:dateEnd', trajects.getTrajectsBetweenDates);

module.exports = router;