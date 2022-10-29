const express = require('express');
const router = express.Router();
const db = require('../../database');
const clients = require('../../public/js/queries/clientQueries')
const plantsQuery = require('../../public/js/queries/plantsQueries')
const cartQuery = require('../../public/js/queries/cartQueries')
const bcrypt = require('bcrypt');
router.use(express.urlencoded({ extended: false }))




router.get('/cart', (req, res) => {
    if (userdata == null) {
        res.redirect('/')
    }
    else {
        const select = cartQuery.selectOrder(1, userdata.mail);
        select.then(cart => {
            if (cart.status === "success") {
                res.render('cart', { cart: cart.data, client: userdata })
            } else {
                console.log(cart.status)
            }
        })
    }
})




router.post('/createUser', async (req, res) => {
    try {
        const hashedPasswords = await bcrypt.hash(req.body.password, 10)
        const create = clients.createUser(req.body.lastname, req.body.firstname, req.body.mail, hashedPasswords)
        create.then(user => {
            if (user.status === "success") {
                res.redirect('/');
            } else {
                res.json(user)
            }
        }
        )
    } catch {
        res.status(500).send()
    }


})

router.get('/Profile', function (req, res) {
    if (userdata == null) {
        res.redirect('/')
    }
    else {
        res.render('Profile', userdata)
    }
})

router.post('/disconnect', function (req, res) {
    userdata = null
    plants = null
    res.redirect('/')
})

router.post('/UpdateUser', async (req, res) => {
    if (userdata == null) {
        res.redirect('/')
    } else {

        try {
            const hashedPasswords = await bcrypt.hash(req.body.password, 10)
            const update = clients.updateUser(req.body.lastname, req.body.firstname, req.body.mail, hashedPasswords)
            update.then(user => {
                updateUserData(req.body.lastname, req.body.firstname, req.body.mail, req.body.password)
                if (user.success === true) {
                    res.render('Profile', userdata)
                } else {
                    res.send("Error 404 not found")
                }
            }
            )
        } catch {
            res.status(500).send()
        }
    }
})

router.post('/home', async function (req, res) {

    if (req.body.mail) {
        try {
            const user = await clients.SearchUser(req.body.mail)
            if (user.status === "success") {
                if (await bcrypt.compare(req.body.password, user.data[0].password)) {
                    userdata = user.data[0]
                    userdata.password = req.body.password
                    plants = await plantsQuery.selectAllPlants();
                    res.render('Home', { plants: plants });
                }
                else {
                    res.redirect('/')
                }
            }
            else {
                console.log("user not found")
                res.redirect('/')
            }
        }
        catch (e) {
            return console.log("error" + e)
        }
    }
    else if (req.body.typePlant) {
        const select = plantsQuery.selectPlants(req.body.typePlant, req.body.pmin, req.body.pmax);
        select.then(plants => {
            res.render('Home', { client: userdata, plants: plants });
        });
    } else {
        res.redirect('/')
    }

})


router.get('/home', function (req, res) {
    if (userdata == null) {
        res.redirect('/')
    }
    else {
        res.render('Home', { plants: plants });
    }

})



router.post('/DeleteClient', async (req, res) => {
    if (userdata == null) {
        res.redirect('/')
    } else {
        const del = clients.DeleteUser(req.body.mail)
        del.then(() => {
            res.redirect('/')
        })
    }
})

router.post('/cart', async (req, res) => {
    if (userdata == null) {
        res.redirect('/')
    } else {
        const check = cartQuery.checkOrder(1, req.body.user, req.body.idplants, req.body.price, req.body.qty, req.body.name)
    }
})




function updateUserData(lastname, firstname, mail, password) {
    userdata.lastname = lastname
    userdata.firstname = firstname
    userdata.mail = mail
    userdata.password = password

}

module.exports = router;

