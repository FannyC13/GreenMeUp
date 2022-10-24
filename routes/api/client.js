const express = require('express');
const router = express.Router();
const db = require('../../database');
const clients = require('../../js/queries/clientQueries')
const plantsQuery = require('../../js/queries/plantsQueries')
const path = require('path')
const bcrypt = require('bcrypt');
const { appendFile } = require('fs');
const app =express();
router.use(express.urlencoded({extended:false}))

router.get('/', function(req,res){
    db.select().from('client').orderBy('mail').then(function(data){
        res.send(data);
});
});

router.post('/createUser', async (req,res) =>{
    try{
        const hashedPasswords = await bcrypt.hash(req.body.password, 10)
        const create = clients.createUser(req.body.lastname, req.body.firstname, req.body.email, hashedPasswords)
        create.then(user => {
            if(user.status === "success"){
                //res.send(user.data) 
                res.render('Login');

            }else{
                res.json(user)
            }
        })
    }catch{
        res.status(500).send()
    }
})

router.get('/:mail/:password/Home.html',function(req,res){
        res.sendFile('Home.html', { root: path.join(dirname, '../../public/html/')});
})

router.get('/:mail/:password/Profile.html',function(req,res){
    const User = clients.SearchUser(req.params.mail, req.params.password)
    User.then(user => {
        if(user.status === "success"){
            res.render('Profile', {user : (user.data)[0]});
        }else{
            res.json(user)
        }
    } )
})



router.patch('/:mail', function(req,res){
    db('client').where({mail: req.params.mail}).update(req.body).then(function(data){
        res.send(data);
    });

})
//put is idempotent so you are editing the actual data

router.get('/UpdateUser/:lastname/:firstname/:mail/:password/', function(req,res){
    const update = clients.updateUser(req.params.lastname, req.params.firstname, req.params.mail,req.params.password);
    update.then(user =>{
        res.send(user.data)
    })
})


router.post('/', function(req,res){
    const Login = clients.SearchUser(req.body.email,req.body.password);
    const select = plantsQuery.selectAllPlants();
    Login.then(user => {
        if(user.status === "success"){
            select.then(plants => {
                data = user.data;
                res.render('Home', {client: data[0], plants: plants});
                });

        }else{
            res.json(user)
        }
    } )
})


router.get('/DeleteClient/:mail/:password', function(req,res){
    const del = clients.DeleteUser( req.params.mail, req.params.password)
    del.then(user =>{
        res.send(user.status)
    })
})


router.get('/:mail', function(req,res){
    db('client').where({mail: req.params.mail}).then(function(data){
        res.send(data);
    });

})

module.exports = router;