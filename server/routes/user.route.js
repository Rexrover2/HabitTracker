// Router for user
// Operators: CRUD (Create, Read, Update, Delete)

const pool = require('../db');
const router = require('express').Router();
const jwtCheck = require('../auth');

router.all('/*', (req, res, next) => {
  if (['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    jwtCheck(req, res, next);
  } else {
    next();
  }
});

// GET current user - /
/* router.get("/", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM User");
    res.json(users.rows);
  } catch (error) {
    console.log(error.message);
  }
}); */

// PATCH modify user fields, change password & email- /

// DELETE specified user - /
router.delete('/', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await pool.query(
      `DELETE FROM "User" \
      WHERE username='${username}';`
    );
    res.json(user.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// POST sign up, create a new user - /
router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;
    // TODO: NOT SQL INJECTION SAFE
    const user = await pool.query(
      `INSERT INTO "User" (username, email) \
      VALUES ('${username}', '${email}') \
      RETURNING *;`
    );
    res.json(user.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// POST log in - /

// POST log out - /

// POST log out everywhere - /

module.exports = router;
