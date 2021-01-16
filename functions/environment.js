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
};
