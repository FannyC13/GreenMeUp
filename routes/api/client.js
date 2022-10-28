const express = require('express');
const router = express.Router();
const db = require('../../database');
const clients = require('../../public/js/queries/clientQueries')
const plantsQuery = require('../../public/js/queries/plantsQueries')
const cartQuery = require('../../public/js/queries/cartQueries')
const bcrypt = require('bcrypt');
router.use(express.urlencoded({extended:false}))


router.get('/cart', (req,res) =>{
    const select = cartQuery.selectOrder(1, userdata.mail);
    select.then(cart => {
        if(cart.status === "success"){
            res.render('cart',{cart: cart.data, client: userdata})
        }else{
            console.log(cart.status)
        }
    })
    
})

router.get('/', function(req,res){
    db.select().from('client').orderBy('mail').then(function(data){
        res.send(data);
    });
});



router.post('/createUser', async (req,res) =>{
    try{
        const hashedPasswords = await bcrypt.hash(req.body.password, 10)
        const create = clients.createUser(req.body.lastname, req.body.firstname, req.body.mail, hashedPasswords)
        create.then(user => {
            if(user.status === "success"){
                res.redirect('/');
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

router.post('/HomeSearch', function(req,res){
    const select = plantsQuery.searchPlant(req.body.barreSearch);
    select.then(plants => {
        res.render('Home', {client: userdata, plants: plants});
    });
});


//put is idempotent so you are editing the actual data

router.post('/UpdateUser', async (req,res)=>{   
    try{
        const hashedPasswords =  await bcrypt.hash(req.body.password, 10)
        const update = clients.updateUser(req.body.lastname,req.body.firstname,req.body.mail, hashedPasswords)
        update.then(user =>{
            updateUserData(req.body.lastname,req.body.firstname,req.body.mail,req.body.password)
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

router.post('/Homefilter', function(req, res){
    const select = plantsQuery.selectPlants(req.body.typePlant, req.body.pmin, req.body.pmax);
    select.then(plants => {
        res.render('Home', {client: userdata, plants: plants});
    });
});

router.post('/', function(req,res){
    const Login = clients.SearchUser(req.body.mail,req.body.password);
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

router.get('/home', function(req,res){
    const select = plantsQuery.selectAllPlants();
        select.then(plants => {
                res.render('Home', {plants: plants});
                });
})



router.post('/DeleteClient', async (req,res) => {
    const del = clients.DeleteUser( req.body.mail)
    del.then(() =>{
        res.redirect('/')
    })
})

router.post('/cart', async (req,res)=>{
    const check = cartQuery.checkOrder(1,req.body.user,req.body.idplants,req.body.price, req.body.qty, req.body.name)
})


function updateUserData(lastname,firstname,mail,password){
    userdata.lastname = lastname
    userdata.firstname = firstname
    userdata.mail = mail
    userdata.password = password

}

module.exports = router;

