const express = require('express');
const router = express.Router();
const plantsRoute = require('./plants')
router.use('/plants', plantsRoute);
const clientRoute = require('./client')
router.use('/client', clientRoute);

module.exports = router;
