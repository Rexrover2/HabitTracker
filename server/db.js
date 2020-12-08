const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const Pool = require('pg').Pool;

// Connect to postgresql database hosted on aws rds. 
const pool = new Pool({
  host     : process.env.RDS_HOSTNAME,
  database : process.env.RDS_DB_NAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

pool.on('error', (err, client) => {
  if (err) {
    console.error('Pool error: ' + err.stack);
    return;
  }
});

module.exports = pool;