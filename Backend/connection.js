const mysql = require('mysql2');

const database = require('./configuration/database');

var connection = mysql.createConnection({
    host: database.host,
    user: database.user,
    password: database.password,
    database: database.database,
    //port: database.port
});

connection.connect((err) => {
    if (err){
        console.log('Hubo un error de conexión');
        console.log(err);
        return;
    }
    console.log('Conexión establecida')
});

module.exports = connection;