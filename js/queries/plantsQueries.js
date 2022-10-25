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

const searchPlant = async (name) =>{
    try{
        const selectPlant = await db('plants').where({name: name}).select()
        return selectPlant
    }catch(e){
        console.log("Error with SQL database")
        return null;
    }
}

exports.searchPlant = searchPlant
exports.selectAllPlants = selectAllPlants;
