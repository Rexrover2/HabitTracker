const pool = require('../db');

const getUsername = async (req, res) => {
  try {
    const { uid } = req;

    const username = await pool.query(
      `SELECT username FROM "User" \
      WHERE uid = $1;`,
      [uid]
    );
    res.json(username.rows);
  } catch {
    res.sendStatus(400);
  }
};

module.exports = { getUsername };
