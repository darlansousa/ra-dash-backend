
const Datastore = require('knex');

const host = `${process.env.RA_API_DB_HOST || '127.0.0.1'}`
const user = `${process.env.RA_API_DB_USER || 'root'}`
const password = `${process.env.RA_API_DB_PASS || 'root'}`
const database = `${process.env.RA_API_DB_NAME || 'ra_collector'}`

db = new Datastore({
    client: 'mysql2',
    connection: {
        host: host,
        user: user,
        password: password,
        database: database
    }
});
console.log('Database is running');


module.exports = db;
