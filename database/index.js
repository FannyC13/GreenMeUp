const knex = require('knex')({
    client:'mysql',
    connection:{
        host:'localhost',
        database:'greenmeup',
        user: 'root',
        password: '6210',
    }
});

module.exports = knex;