const  db = require('../../../database');

const checkSelect = async ( mail) => {
  try{
    const checkS = await db('cart').select('idcart').where({mail:mail})
    return checkS
    
  }catch(e){
    return e.toString()
  }
}
const checkOrder = async (idcart, mail , idplants, price, quantity, name) => {
    try{
        var alreadyOrdered = false
        let select = selectOrder(idcart, mail)
        select.then(order => {
          order.data.forEach(element => {
            if(element.idplants == idplants){
              alreadyOrdered = true
            }
          })
          if(alreadyOrdered){
            updateOrder(idcart ,mail ,idplants,price,quantity,name)
          }else{
            insertOrder(idcart , mail , idplants, price,quantity,name)
          }
        })
      }catch(e){
        return false
      }
}


const updateOrder = async (idcart, mail , idplants, price,quantity,name) => {
  try {
    const create = await db('cart').update({idcart: idcart, mail :mail, idplants: idplants, price: price,quantity:quantity, name:name}).where({mail: mail, idplants: idplants})
    respObj = {
      status: "success",
      data: create
    }
    console.log("updated")
    return respObj
    
  }catch(e){
    console.log(e)
    respObj = {
      status: " update failed",
    }
    return respObj
  }
}

const insertOrder = async (idcart, mail , idplants, price,quantity,name) => {
  try {
    const create = await db('cart').insert({idcart: idcart, mail :mail, idplants: idplants, price: price,quantity:quantity, name:name})
    respObj = {
      status: "success",
      data: create
    }
    console.log("inserted")
    return respObj
    
  }catch(e){
    respObj = {
      status: " insert failed",
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
        return {status: "select failed"}
    }
  }

exports.updateOrder = updateOrder;
exports.checkOrder = checkOrder;
exports.insertOrder = insertOrder;
exports.selectOrder = selectOrder;
exports.checkSelect = checkSelect;
