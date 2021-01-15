const pool = require('../db');

const signUp = async (req, res) => {
  try {
    const { uid } = req;
    const { username } = req.body;
    console.log(`Signing up Sir/Madam ${username}!`);
    await pool.query(
      `INSERT INTO "User" (username, uid) 
      VALUES ($1, $2);`,
      [username, uid]
    );

    res.sendStatus(200);
  } catch (e) {
    return res.status(401).send({
      error: 'Something went wrong',
    });
  }
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

module.exports = { signUp };
