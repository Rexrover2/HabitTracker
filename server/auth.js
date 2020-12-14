const jwt = require('express-jwt');
const jwksClient = require('jwks-rsa');
const path = require('path');
require('dotenv').config();

const auth0Domain = process.env.AUTH0_DOMAIN;
const auth0ApiIdentifier = process.env.AUTH0_AUDIENCE;

// We’ll create a middleware function to validate the access token when our API is called.
var jwtCheck = jwt({
  secret: jwksClient.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Domain}/.well-known/jwks.json`,
  }),

  algorithms: ['RS256'],
  issuer: `https://${auth0Domain}/`,
  audience: auth0ApiIdentifier,
});

module.exports = jwtCheck;
