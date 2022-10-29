const express = require('express');
const app = express();
const apiRoute = require('./routes/api')
app.use(express.json());
const path = require('path');

var userdata = null;
var plants = null;

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
app.get('*', async (req, res) => {
    res.render('404')
});

app.listen('1010',()=>{
    console.log('Server started at port 1010')
})



