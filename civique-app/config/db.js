/*const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "civique_app"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL connected");
});

module.exports = db;*/
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    waitForConnections: true,
    connectionLimit: 20
});

async function testConnection() {
    try {
        const conn = await pool.getConnection();
        console.log("✅ MySQL connecté");
        conn.release();
    } catch (err) {
        console.error("❌ Erreur connexion MySQL :", err);
    }
}

testConnection();

module.exports = pool;