const  db = require('../../database');


const selectAllPlants = async () => {
    try{
        const selectQuery = await db('plants').select();
        return selectQuery
    }catch(e){
        console.log("Error with SQL database")
        return null;
    }
}

const selectPlants = async (type, priceMin, priceMax) => {
    try{
        const selectQuery = await db('plants').where({type : type}).whereBetween('price', [priceMin, priceMax]).select();
        return selectQuery
    }catch(e){
        console.log("Error with SQL database")
        return null;
    }
}

exports.selectAllPlants = selectAllPlants;
exports.selectPlants = selectPlants;
