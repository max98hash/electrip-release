const express = require('express');
const router = express.Router();

const stuff = require('../controllers/stuff');

router.get('/', stuff.helloWorld);

module.exports = router;