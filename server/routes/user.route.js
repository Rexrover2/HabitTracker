// Router for user
// Operators: CRUD (Create, Read, Update, Delete)

const pool = require("../db");

// Create a new router
const router = require("express").Router();

// GET current user - /
router.get("/", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM User");
    res.json(users.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// PATCH modify user fields - /

// DELETE current user - /

// POST sign up, create a new user - /
router.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = await pool.query(
      "INSERT INTO User VALUES ($1, $2) RETURNING *",
      [username, email]
    );
    res.json(newUser);
  } catch (error) {
    console.log(error.message);
  }
});

// POST log in - /

// POST log out - /

// POST log out everywhere - /



module.exports = router;