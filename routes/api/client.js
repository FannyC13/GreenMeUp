const express = require('express');
const router = express.Router();
const db = require('../../database');
const clients = require('../../js/queries/clientQueries')
const plantsQuery = require('../../js/queries/plantsQueries')
const path = require('path')

router.get('/', function(req,res){
    db.select().from('client').orderBy('mail').then(function(data){
        res.send(data);
});
});


router.get('/CreateUser/:mail/:password/:lastname/:firstname',function(req,res){
    const create = clients.createUser(req.params.lastname, req.params.firstname,  req.params.mail,req.params.password)
    create.then(user => {
            if(user.status === "success"){
                //res.send(user.data)
                res.sendFile('Login.html', { root: path.join(__dirname, '../../public/html/')});

            }else{
                res.json(user)
            }
    })})

router.get('/:mail/:password/Profile.html',function(req,res){
    const User = clients.SearchUser(req.params.mail, req.params.password)
    User.then(user => {
        if(user.status === "success"){
            res.render('Profile', user.data[0]);
        }else{
            res.json(user)
        }
    } )
})

//put is idempotent so you are editing the actual data

router.get('/UpdateUser/:lastname/:firstname/:mail/:password/', function(req,res){
    const update = clients.updateUser(req.params.lastname, req.params.firstname, req.params.mail,req.params.password);
    update.then(user =>{
        if(user.success === true){
            res.render('Profile', user.data)
        }else{
            res.send("Error 404 not found")
        }
        
    })
})
router.get('/:mail/:password', function(req,res){
    const Login = clients.SearchUser(req.params.mail,req.params.password);
    const select = plantsQuery.selectAllPlants();
    Login.then(user => {
        if(user.status === "success"){
            select.then(plants => {
                data = user.data;
                res.render('Home', {client: data[0], plants: plants});
                });

        }else{
            res.redirect('/')
        }
    } )
})


router.get('/DeleteClient/:mail/:password', function(req,res){
    const del = clients.DeleteUser( req.params.mail, req.params.password)
    del.then(() =>{
        res.redirect('/')
    })
})


module.exports = router;