// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "root",
//   password: "root",
//   host: "pg_container",
//   port: 5432,
//   database: "user_db",
// });

// console.log(pool, "pool");

const pgp = require("pg-promise")();
const db = pgp("postgres://root:root@localhost:5432/user_db");

module.exports = db;
