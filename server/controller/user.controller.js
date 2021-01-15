const pool = require('../db');

const deleteUser = async (req, res) => {
  try {
    const { uid } = req;
    const user = await pool.query(
      `DELETE FROM "User" \
      WHERE uid=$1;`,
      [uid]
    );

    res.json(user.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const getUsername = async (req, res) => {
  try {
    const { uid } = req;

    const username = await pool.query(
      `SELECT username FROM "User" 
      WHERE uid = $1;`,
      [uid]
    );
    res.json(username.rows);
  } catch {
    res.sendStatus(400);
  }
};

module.exports = { getUsername, deleteUser };
