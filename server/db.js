const Pool = require('pg').Pool;
const config = require('../environment');

// Connect to postgresql database hosted on aws rds.
const pool = new Pool({
  host: config.host,
  user: config.user,
  password: config.password,
  port: config.port,
});

pool.on('error', (err, client) => {
  if (err) {
    console.error('Pool error: ' + err.stack);
    return;
  }
});

module.exports = pool;
