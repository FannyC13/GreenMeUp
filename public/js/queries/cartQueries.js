const  db = require('../../../database');


const insertOrder = async (idcart, mail , idplants, price,quantity,name) => {
    try{
        const create = await db('cart').insert({idcart: idcart, mail :mail, idplants: idplants, price: price,quantity:quantity, name:name});
        respObj = {
          status: "success",
          data: create
        }
        return respObj
      }catch(e){
        respObj = {
          status: "failed",
        }
        return respObj
      }  
    }

const selectOrder = async(idcart, mail) =>{
    try{
        const select = await db('cart').where({mail:mail , idcart:idcart}).select();
        return {status:"success",
                data: select}
    }catch(e){
        return {status: "failed"}
    }
}

exports.insertOrder = insertOrder;
exports.selectOrder = selectOrder