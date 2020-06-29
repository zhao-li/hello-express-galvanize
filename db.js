const Pool = require('pg').Pool;
const db = new Pool({
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
});

module.exports = db;
