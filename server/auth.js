const jwt = require('express-jwt');
const jwksClient = require('jwks-rsa');
const config = require('../environment');
// We’ll create a middleware function to validate the access token when our API is called.
var jwtCheck = jwt({
  secret: jwksClient.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${config.auth0Domain}/.well-known/jwks.json`,
  }),

  algorithms: ['RS256'],
  issuer: `https://${config.auth0Domain}/`,
  audience: config.auth0ApiIdentifier,
});

module.exports = jwtCheck;
