const db = require('../../database');

const createUser = async (lastname,firstname,mail,password) => {
    try{
      const create = await db('client').insert({lastname:lastname, firstname:firstname, password: password, mail: mail}).returning('*');
      console.log(create)
      respObj = {
        status: "success",
        data: create
      }
      return respObj
    }catch(e){
      console.log(e)
      respObj = {
        status: "failed",
        data: "User already exists"
      }
      return respObj
    }  
  }

   

const updateUser = async (lastname,firstname,mail,password)  =>{
    try{
    const update = await db('client').where({mail: mail}).update({
        lastname:lastname,
        firstname: firstname,
        password:password,
        mail: mail,
        }).returning('*')
        if(Object.keys(update).length != 0){
        return {
                status: "success",
                data : update
        }
        }else{
            throw new Error();
        }
    }catch(e){
      return{status: "false", data: "User doesn't exist, try again"}
    }
}

    
  const DeleteUser = async (mail,password) => {
    try{
      const del = await db('client').where({password: password, mail: mail}).del();
      console.log(del)
      respObj = {
        status: "success",
      }
      return respObj
    }catch(e){
      console.log(e)
      respObj = {
        status: "failed",
        data: "User not Found"
      }
      return respObj
    }
      
  }



  const SearchUser = async (mail,password) => {
    try{
      const search = await db('client').where({password: password}).where({mail: mail}).select().returning('*');
      console.log(search)
      if(Object.keys(search).length != 0){
        return {
                status: "success",
                data : search
        }
        }else{
            throw new Error("User not found");
        }
    }catch(e){
      return {
        status: "failed",
        data: "User not Found"
      }
    }
      
  }

exports.createUser = createUser;
exports.DeleteUser = DeleteUser;
exports.SearchUser = SearchUser;
exports.updateUser = updateUser;