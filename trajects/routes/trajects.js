const express = require('express');
const router = express.Router();

const trajects = require('../controllers/trajects');

//const auth = require('../middleware/auth');

router.get('/:id', trajects.getTraject);
router.get('/user/:userId', trajects.getTrajects);
router.post('/create', trajects.createTraject);
router.put('/:id', trajects.modifyTraject);
router.delete('/:id', trajects.deleteTraject);

router.get('/user/:userId/:dateBeg/:dateEnd', trajects.getTrajectsBetweenDates);

module.exports = router;