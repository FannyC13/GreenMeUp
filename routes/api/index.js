const express = require('express');
const router = express.Router();
const clientRoute = require('./client')
const plantRoute = require('./plants')

router.use('/client', clientRoute);
router.use('/plants', plantRoute)

module.exports = router;
