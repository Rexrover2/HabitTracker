const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, './.env'),
});

module.exports = {
  serverURL: process.env.REACT_APP_BASE_URL,
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  auth0Domain: process.env.AUTH0_DOMAIN,
  auth0ApiIdentifier: process.env.AUTH0_AUDIENCE,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  clientSecret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
};
