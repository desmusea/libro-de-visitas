const mysql = require('mysql');

const config = {
    host: "localhost",
    user: "desmusea",
    password: "desmusea2020",
    database: "librodevisitas"
};
const pool = mysql.createPool(config);

module.exports = pool;