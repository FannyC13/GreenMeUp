const express = require('express');
const router = express.Router();
const db = require('../../database');
const queries = require('../../js/queries/clientQueries')
const path = require('path')



router.get('/', function(req,res){
    db.select().from('client').orderBy('mail').then(function(data){
        res.send(data);
});
});


router.get('/CreateUser/:mail/:password/:lastname/:firstname',function(req,res){
    const create = queries.createUser(req.params.lastname, req.params.firstname,  req.params.mail,req.params.password)
    create.then(user => {
            if(user.status === "success"){
                //res.send(user.data)
                res.sendFile('Login.html', { root: path.join(__dirname, '../../public/html/')});
               
            }else{
                res.json(user)
            }
    })})

router.get('/:mail/:password/Home.html',function(req,res){
        res.sendFile('Home.html', { root: path.join(__dirname, '../../public/html/')});
})

router.get('/:mail/:password/Profile.html',function(req,res){
    res.sendFile('Profile.html', { root: path.join(__dirname, '../../public/html/')});
})

router.patch('/:mail', function(req,res){
    db('client').where({mail: req.params.mail}).update(req.body).returning('*').then(function(data){
        res.send(data);
    });
    
})
//put is idempotent so you are editing the actual data

router.get('/UpdateUser/:lastname/:firstname/:mail/:password/', function(req,res){
    const update = queries.updateUser(req.params.lastname, req.params.firstname, req.params.mail,req.params.password);
    update.then(user =>{
        res.send(user.data)
    })
}) 


router.get('/:mail/:password', function(req,res){
    const Login = queries.SearchUser(req.params.mail,req.params.password);
    Login.then(user => {
        if(user.status === "success"){
            //res.send(user.data)
            data =user.data;
            console.log(data[0])
            res.render('Home', data[0]);
        }else{
            res.json(user)
        }
    } )
})

router.get('/DeleteClient/:mail/:password', function(req,res){
    const del = queries.DeleteUser( req.params.mail, req.params.password)
    del.then(user =>{
        res.send(user.status)
    })
})


router.get('/:mail', function(req,res){
    db('client').where({mail: req.params.mail}).returning('*').then(function(data){
        res.send(data);
    });
    
})

module.exports = router;