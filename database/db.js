const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    port:3306,
    database: "latihan",
    user: "root",
    password: "",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Database connected...");
    }
});

module.exports = db;
