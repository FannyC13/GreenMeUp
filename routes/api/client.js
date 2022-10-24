const express = require('express');
const router = express.Router();
const db = require('../../database');
const clients = require('../../js/queries/clientQueries')
const plantsQuery = require('../../js/queries/plantsQueries')
const bcrypt = require('bcrypt');
router.use(express.urlencoded({extended:false}))
var userdata = null;

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
                res.render('Login');
            }else{
                res.json(user)
            }
        }
        )}catch{
            res.status(500).send()
        }
    })
    
router.get('/Profile', function(req,res){
    res.render('Profile', userdata)
})

router.post('/Profile', function(req,res){
    const user = clients.SearchUser(req.body.mail)
    try{
        if (bcrypt.compare(req.body.password, user.password)){
            user.then(user => {
                if(user.status === "success"){
                    res.render('Profile', user.data[0]);
                }else{
                    res.json(user)
                }
            } )
            return done(null, user)
        }
        else{
            return done(null, false, {message : 'Password incorrect'})
        }
    }
    catch(e){
        return done(e)
    }
    
})



//put is idempotent so you are editing the actual data

router.post('/UpdateUser', async (req,res)=>{   
    try{
        const hashedPasswords =  await bcrypt.hash(req.body.password, 10)
        update.then(user =>{
            if(user.success === true){
                res.render('Profile', userdata)
            }else{
                res.send("Error 404 not found")
            }
        }
        )}catch{
            res.status(500).send()
        }

   
        
    })



router.post('/', function(req,res){
    const Login = clients.SearchUser(req.body.email,req.body.password);
    const select = plantsQuery.selectAllPlants();
    Login.then(user => {
        if(user.status === "success"){
            select.then(plants => {
                data = user.data;
                userdata = data[0];
                userdata.password = req.body.password;
                res.render('Home', {client: data[0], plants: plants});
                });

        }else{
            res.redirect('/')
        }
    } )
})


router.post('/DeleteClient', async (req,res) => {
    const del = clients.DeleteUser( req.body.email)
    del.then(() =>{
        res.redirect('/')
    })
})


module.exports = router;