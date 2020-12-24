const pool = require('../db');

// TODO: ADD status codes and constraints -> ie. var char lengths!

const getHabits = async (req, res) => {
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
};

const createHabit = async (req, res) => {
  try {
    const { username } = req.params;
    const { name, datestarted, dateended, streakgoal, iconno } = req.body;
    if (username && name && datestarted && iconno) {
      // TODO: NOT SQL INJECTION SAFE
      const habits = await pool.query(
        `INSERT INTO "habit" (name, username, datestarted, dateended, streakgoal, iconno) \
        VALUES ($1, $2, TO_DATE($3, 'DD/MM/YYYY'), $4, $5, $6);`,
        [name, username, datestarted, dateended, streakgoal, iconno]
      );
      res.json(habits.rows);
    } else {
      res.sendStatus(400);
    }
  } catch {
    res.sendStatus(400);
  }
};

const deleteHabit = async (req, res) => {
  try {
    const { hid } = req.body;
    if (hid) {
      const habits = await pool.query(
        `DELETE FROM "habit" \
        WHERE hid=$1`,
        [hid]
      );
      res.json(habits.rows);
    } else {
      res.sendStatus(400);
    }
  } catch {
    res.sendStatus(400);
  }
};

const createEntry = async (req, res) => {
  try {
    const { hid } = req.params;
    const { date } = req.body;
    // TODO: if username, email != fall and are both strings else return 4**
    if (hid && date) {
      const entry = await pool.query(
        `INSERT INTO "entry" (hid, date) \
        VALUES ($1, TO_DATE($2, 'DD/MM/YYYY'))`,
        [hid, date]
      );
      res.json(entry.rows);
    } else {
      res.sendStatus(400);
    }
  } catch {
    res.sendStatus(400);
  }
};

const deleteEntry = async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const entry = await pool.query(
        `DELETE FROM "entry" \
        WHERE id=$1`,
        [id]
      );
      res.json(entry.rows);
    } else {
      res.sendStatus(400);
    }
  } catch {
    res.sendStatus(400);
  }
};

const createNote = async (req, res) => {
  try {
    const { hid } = req.params;
    const { note, body } = req.body;
    // TODO: NOT SQL INJECTION SAFE
    if (hid && note && date) {
      const notes = await pool.query(
        `INSERT INTO "notes" (hid, note,date) \
        VALUES ($1, $2 TO_DATE($3, 'DD/MM/YYYY'))`,
        [hid, note, date]
      );
      res.json(notes.rows);
    } else {
      res.sendStatus(400);
    }
  } catch {
    res.sendStatus(400);
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const notes = await pool.query(
        `DELETE FROM "notes" \
        WHERE id=$1`,
        [id]
      );
      res.json(notes.rows);
    } else {
      res.sendStatus(400);
    }
  } catch {
    res.sendStatus(400);
  }
};

const getNotes = async (req, res) => {
  try {
    const { hid } = req.params;
    if (hid) {
      const notes = await pool.query(
        `SELECT * FROM "notes" \
        WHERE hid=($1)`,
        [hid]
      );
      res.json(notes.rows);
    } else {
      res.sendStatus(400);
    }
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
