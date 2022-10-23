const express = require('express');
const router = express.Router();
const clientRoute = require('./client')
router.use('/client', clientRoute);

module.exports = router;
