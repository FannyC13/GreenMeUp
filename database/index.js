const knex = require('knex')({
    client:'mysql',
    connection:{
        host:'localhost',
        database:'greenmeup',
        user: 'root',
        password: 'Stéphane05',
    }
});

module.exports = knex;