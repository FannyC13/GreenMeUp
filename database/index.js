const knex = require('knex')({
    client:'mysql',
    connection:{
        host:'localhost',
        database:'greenmeup',
        user: 'Julian',
        password: 'password',
    }
});

module.exports = knex;