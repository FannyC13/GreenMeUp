const express = require('express');
const app = express();
const apiRoute = require('./routes/api')
app.use(express.json());
const path = require('path');
const { createUser } = require('./js/queries/clientQueries');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use('/api',apiRoute)
app.use(express.static('public'))

app.get('/',function(req,res){
    res.render('Login')
})

app.get('/create-account',function(req,res){
    res.render('create-account')
})

app.listen('3000',()=>{
    console.log('Server started at port 3000')
})

