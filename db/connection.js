const mysql = require('mysql2');

//connect the database
const db = mysql.createConnection(
    {
        host : 'localhost',
        user : 'root',
        password : 'pwd',
        database : 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database')
);

module.exports = db;