const express = require('express');
const router = express.Router();

const stations = require('../controllers/stations');

const auth = require('../middleware/auth');

router.get('/search/:latitude/:longitude/:distance', stations.getStations);

module.exports = router;