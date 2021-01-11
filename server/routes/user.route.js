const pool = require('../db');
const router = require('express').Router();
const userController = require('../controller/user.controller');

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

// GET get username
router.get('/username', userController.getUsername);

module.exports = router;
