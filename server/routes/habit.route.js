// Router for habits
// Operators: CRUD (Create, Read, Update, Delete)

// Create a new router
const router = require("express").Router();

// GET current user - /
router.get("/", (req, res) => {
  res.set("Content-Type", "application/json");
  res.send('{"message": "Your first habit request!"}');
});

// PATCH modify user fields - /

// DELETE current user - /

// POST sign up - /

// POST log in - /

// POST log out - /

// POST log out everywhere - /

module.exports = router;