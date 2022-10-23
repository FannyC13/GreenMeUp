const knex = require('knex')({
    client:'pg',
    connection:{
        host:'localhost',
        database:'plants',
        user: 'postgres',
        password: 'sieu-eng',
    }
});

module.exports = knex;