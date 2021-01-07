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

const signUp = async (req, res) => {
  // TODO: Navigate to habit page
};

const logIn = async (req, res) => {
  // TODO: Navigate to habit page
};

const logOut = async (req, res) => {
  // TODO: Navigate to home page
};

/* const logOutAll = async (req, res) => {
  try {
    const { username } = req.params;
    const habits = await pool.query(
      `SELECT * FROM "habit" \
      WHERE username = $1;`,
      [username]
    );
    res.json(habits.rows);
  } catch {
    res.sendStatus(400);
  }
}; */

module.exports = { signUp, logIn, logOut };
