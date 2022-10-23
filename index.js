const express = require('express');
const app = express();
const apiRoute = require('./routes/api')
app.use(express.json());
const path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use('/api',apiRoute)
app.use(express.static('public'))
app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/html/Login.html')
})

app.get('/Home',function(req,res){
    res.sendFile(__dirname + '/public/html/Home.html')
})

app.get('/create-account.html',function(req,res){
    res.sendFile(__dirname + '/public/html/create-account.html')
})

app.get('/Profile.html',function(req,res){
    res.sendFile(__dirname + '/public/html/Profile.html')
})

app.listen('3000',()=>{
    console.log('Server started at port 3000')
})