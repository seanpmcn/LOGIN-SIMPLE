const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: mysqlPassword,
    database: "login_system"
});

app.listen(3001, () => {
    console.log("running on port 3001");
});