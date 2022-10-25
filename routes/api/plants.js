const express = require('express');
const router = express.Router();
const plantsQuery = require('../../js/queries/plantsQueries')


router.get('/:name', function (req,res){
    const selectPlant = plantsQuery.searchPlant(req.params.name)
    selectPlant.then(plant => {
        res.render('plants', {plant: plant[0]})
    })
})

module.exports = router;