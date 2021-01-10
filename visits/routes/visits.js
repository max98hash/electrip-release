const express = require('express');
const router = express.Router();

const visits = require('../controllers/visits');

const auth = require('../middleware/auth');

router.get('/:id', visits.getVisit);
router.use('/', visits.getVisits);
router.post('/create', visits.createVisit);
router.put('/:id', visits.modifyVisit);
router.delete('/:id', visits.deleteVisit);

module.exports = router;