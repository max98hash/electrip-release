const express = require('express');
const router = express.Router();

const trajects = require('../controllers/trajects');

const auth = require('../middleware/auth');

router.get('/:id', auth, trajects.getTraject);
router.get('/', auth, trajects.getTrajects);
router.post('/create', auth, trajects.createTraject);
router.put('/:id', auth, trajects.modifyTraject);
router.delete('/:id', auth, trajects.deleteTraject);

router.get('/user/:userId/:dateBeg/:dateEnd', trajects.getTrajectsBetweenDates);

module.exports = router;