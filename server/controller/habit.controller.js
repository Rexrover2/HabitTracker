const router = require('express').Router();

// TODO: ADD status codes and constraints -> ie. var char lengths!

const getHabits = async (req, res) => {
  try {
    const { username } = req.params;
    const habits = await pool.query(
      `SELECT * FROM "habit" \
      WHERE username = '${username}';`
    );
    res.json(habits.rows);
  } catch {
    res.sendStatus(400);
  }
};

const createHabit = async (req, res) => {
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
  } catch {
    res.sendStatus(400);
  }
};

const deleteHabit = async (req, res) => {
  try {
    const { hid } = req.body;
    const habits = await pool.query(
      `DELETE FROM "habit" \
      WHERE hid=$1`,
      [hid]
    );
    res.json(habits.rows);
  } catch {
    res.sendStatus(400);
  }
};

const createEntry = async (req, res) => {
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
  } catch {
    res.sendStatus(400);
  }
};

const deleteEntry = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const entry = await pool.query(
      `DELETE FROM "entry" \
      WHERE id=$1`,
      [id]
    );
    res.json(entry.rows);
  } catch {
    res.sendStatus(400);
  }
};

const createNote = async (req, res) => {
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
  } catch {
    res.sendStatus(400);
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.body;
    const notes = await pool.query(
      `DELETE FROM "notes" \
      WHERE id=$1`,
      [id]
    );
    res.json(notes.rows);
  } catch {
    res.sendStatus(400);
  }
};

const getNotes = async (req, res) => {
  try {
    const { hid } = req.params;
    const notes = await pool.query(
      `SELECT * FROM "notes" \
      WHERE hid=($1)`,
      [hid]
    );
    res.json(notes.rows);
  } catch {
    res.sendStatus(400);
  }
};

module.exports = {
  getHabits,
  createHabit,
  deleteHabit,
  createEntry,
  deleteEntry,
  createNote,
  deleteNote,
  getNotes,
};
