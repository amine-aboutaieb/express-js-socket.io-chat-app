require('dotenv').config();
const mysql = require('mysql');

module.exports = {
    db: mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.PWD
    })
}

