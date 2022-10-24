const knex = require('knex')({
    client:'mysql',
    connection:{
        host:'localhost',
        database:'greenmeup',
        user: 'lucas',
        password: 'admin',
    }
});

module.exports = knex;