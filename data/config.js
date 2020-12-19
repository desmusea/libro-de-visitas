const mysql = require('mysql');

const config = {
    host: "localhost",
    user: "desmusea",
    password: "****",
    database: "librodevisitas"
};
const pool = mysql.createPool(config);

module.exports = pool;
