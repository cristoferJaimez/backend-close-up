const express = require('express')
require("dotenv").config();
const mysql = require("mysql");
//CONX DB MYSQL
//conexion a base de datos Mysql
const conx = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.PORT,
    password: process.env.PASSWORDB,
    user: process.env.USER,
  });
  
  conx.connect((err, data) => {
    if (err) throw err;
    console.log("Connected to database:" , process.env.DATABASE);
  });


  module.exports = conx