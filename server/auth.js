const jwt require('express-jwt');
const jwksClient require('jwks-rsa');

const auth0Domain = 'habittracker5.au.auth0.com/';
const auth0ApiIdentifier = 'http://habittracker.com/api';

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
