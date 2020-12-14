const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, './.env'),
});

module.exports = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  auth0Domain: process.env.AUTH0_DOMAIN,
  auth0ApiIdentifier: process.env.AUTH0_AUDIENCE,
};
