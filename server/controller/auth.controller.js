const config = require('../environment');
const router = require('express').Router();

const requestToken = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.clientSecret}`,
  },
  body: `{"client_id":${config.clientId},"client_secret":${config.clientSecret},"audience":${config.audience},"grant_type":"client_credentials"}`,
};

let url = `https://${config.domain}/oauth/token`;

router.post(url, async (req, res) => {
  authToken = parsedJson(res.body).access_token;
  console.log(authToken);
});
