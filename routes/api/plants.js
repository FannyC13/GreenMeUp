const express = require('express');
const router = express.Router();
const plantsQuery = require('../../public/js/queries/plantsQueries')


router.get('/:name', async function (req, res) {
    if (userdata == null) {
        res.redirect('/')
    }
    else {
        const plant = await plantsQuery.searchPlant(req.params.name)
        res.render('plants', { plant: plant[0], client: userdata })
    }
})

module.exports = router; 