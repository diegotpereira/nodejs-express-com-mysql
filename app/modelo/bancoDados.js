const mysql = require("mysql");
const dbConfig = require("../config/config.bancoDados.js");

// Criar conexão com banco de dados 
var connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

module.exports = connection;