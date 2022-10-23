const knex = require('knex')({
    client:'mysql',
    connection:{
        host:'localhost',
        database:'greenmeup',
        user: 'root',
        password: 'tennis92',
    }
});

module.exports = knex;