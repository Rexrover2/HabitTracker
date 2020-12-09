// Router for habits
// Operators: CRUD (Create, Read, Update, Delete)

const pool = require('../db');
const router = require('express').Router();

// Base = /habit
// TODO: ADD status codes and constraints -> ie. var char lengths!

// GET list of all habits - /:username
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const habits = await pool.query(
      `SELECT * FROM "habit" \
      WHERE username = '${username}';`
    );
    res.json(habits.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// POST create new habit - /:username
router.post('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { name, datestarted, dateended, streakgoal, iconno } = req.body;
    // TODO: NOT SQL INJECTION SAFE
    const habits = await pool.query(
      `INSERT INTO "habit" (name, username, datestarted, dateended, streakgoal, iconno) \
      VALUES ('${name}', '${username}', TO_DATE('${datestarted}', 'DD/MM/YYYY'), $1, $2, $3)`,
      [dateended, streakgoal, iconno]
    );
    res.json(habits.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// TODO: PATCH modify habit information - /

// DELETE specific user's habit - /
router.delete('/', async (req, res) => {
  try {
    const { hid } = req.body;
    const habits = await pool.query(
      `DELETE FROM "habit" \
      WHERE hid=$1`,
      [hid]
    );
    res.json(habits.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// GET current steak in days - /

// GET longest steak in days - /

// POST create a new entry for a given habit - /entry/:hid
router.post('/entry/:hid', async (req, res) => {
  try {
    const { hid } = req.params;
    const { date } = req.body;
    // TODO: if username, email != fall and are both strings else return 4**
    const entry = await pool.query(
      `INSERT INTO "entry" (hid, date) \
      VALUES ($1, TO_DATE('${date}', 'DD/MM/YYYY'))`,
      [hid]
    );
    res.json(entry.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// DELETE an entry for a given date - /entry
router.delete('/entry', async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const entry = await pool.query(
      `DELETE FROM "entry" \
      WHERE id=$1`,
      [id]
    );
    res.json(entry.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// POST create a new note- /note/:hid
router.post('/note/:hid', async (req, res) => {
  try {
    const { hid } = req.params;
    const { note } = req.body;
    // TODO: NOT SQL INJECTION SAFE
    const notes = await pool.query(
      `INSERT INTO "notes" (hid, note) \
      VALUES ($1, '${note}')`,
      [hid]
    );
    res.json(notes.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// DELETE a note - /note/:id
router.delete('/note', async (req, res) => {
  try {
    const { id } = req.body;
    const notes = await pool.query(
      `DELETE FROM "notes" \
      WHERE id=$1`,
      [id]
    );
    res.json(notes.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// PATCH edit existing comment for given time and date - /

// GET Get all comment instances for a given habit - /note/:hid
router.get('/note/:hid', async (req, res) => {
  try {
    const { hid } = req.params;
    const notes = await pool.query(
      `SELECT * FROM "notes" \
      WHERE hid=($1)`,
      [hid]
    );
    res.json(notes.rows);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
