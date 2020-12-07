const express = require("express");
const cors = require("cors");
const Pool = require('pg').Pool;

const app = express();

// Middleware - cors
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("server has started on port 5000");
})

// Connect to postgresql database hosted on aws rds.
const pool = new Pool({
  host     : process.env.RDS_HOSTNAME,
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

