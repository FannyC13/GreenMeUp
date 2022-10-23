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

exports.selectAllPlants = selectAllPlants;
