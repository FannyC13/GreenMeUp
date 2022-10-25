const bcrypt = require('bcrypt');


const db = require('../../database');

const createUser = async (lastname,firstname,mail,password) => {
    try{
      const create = await db('clients').insert({lastname:lastname, firstname:firstname, password: password, mail: mail});
      respObj = {
        status: "success",
        data: create
      }
      return respObj
    }catch(e){
      respObj = {
        status: "failed",
        data: "User already exists"
      }
      return respObj
    }  
  }

   

const updateUser = async (lastname,firstname,mail,password)  =>{
    try{
      const update = await db('clients').where({mail: mail}).update({
        lastname:lastname,
        firstname: firstname,
        password:password,
        mail: mail,
        })
        if(update){
        return {
                success: true,
                data : {lastname: lastname, firstname: firstname, password: password, mail: mail}
        }
        }else{
            throw new Error();
        }
    }catch(e){
      return{status: "false", data: "User doesn't exist, try again"}
    }
}

    
  const DeleteUser = async (mail) => {
    try{
      const del = await db('clients').where({mail: mail}).del();
      respObj = {
        status: "success",
      }
      return respObj
    }catch(e){
      respObj = {
        status: "failed",
        data: "User not Found"
      }
      return respObj
    }
      
  }

  const SearchUser = async (mail) => {
    try{
      const search = await db('clients').where({mail: mail}).select();
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