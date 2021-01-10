const config = require('../../environment');
const router = require('express').Router();
const pool = require('../db');

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

const signUp = async (req, res, next) => {
  try {
    // Email & password??
    const { uid } = req;
    const { username } = req.body;
    console.log(`Signing up Sir/Madam ${username}!`);
    await pool.query(
      `INSERT INTO "User" (username, uid) 
      VALUES ($1, $2);`,
      [username, uid]
    );

    res.sendStatus(200);
    // TODO: Navigate to habit page
  } catch (e) {
    return res.status(401).send({
      error: 'Something went wrong',
    });
  }
};

const logIn = async (req, res) => {
  // Generate token
  console.log('user controller, login called!');
  // TODO: Navigate to habit page
};

const logOut = async (req, res) => {
  // TODO: Navigate to home page
};

const secret = async (req, res) => {
  console.log('user controller, secret called!');
  // TODO: Navigate to habit page
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

module.exports = { signUp, logIn, logOut, secret };
