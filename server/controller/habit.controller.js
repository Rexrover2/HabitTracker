const pool = require('../db');
const format = require('pg-format');

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
    const { name, dateStarted, dateEnded, streakGoal, iconNo } = req.body;
    if (username && name && dateStarted && iconno) {
      // TODO: NOT SQL INJECTION SAFE
      const habits = await pool.query(
        `INSERT INTO "habit" (name, username, "dateStarted", "dateEnded", "streakGoal", "iconNo") \
        VALUES ($1, $2, TO_DATE($3, 'DD/MM/YYYY'), $4, $5, $6);`,
        [name, username, dateStarted, dateEnded, streakGoal, iconNo]
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

const getEntry = async (req, res) => {
  try {
    const { hid } = req.params;
    if (hid) {
      const entries = await pool.query(
        `SELECT * FROM "entry" \
        WHERE hid=($1)`,
        [hid]
      );
      res.json(entries.rows);
    } else {
      res.sendStatus(404);
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

const createEntries = async (req, res) => {
  try {
    const { hid } = req.params;
    const { dates } = req.body;
    // TODO: if username, email != fall and are both strings else return 4**
    if (hid && dates) {
      const entries = dates.map((date) => [hid, date]);
      const entry = await pool.query(
        format('INSERT INTO "entry" (hid, date) \
        VALUES %L', entries)
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
    const { entryId } = req.body;
    if (entryId) {
      const entry = await pool.query(
        `DELETE FROM "entry" \
        WHERE id=$1`,
        [entryId]
      );
      res.json(entry.rows);
    } else {
      res.sendStatus(400);
    }
  } catch {
    res.sendStatus(400);
  }
};

const deleteEntries = async (req, res) => {
  try {
    const { hid, dates } = req.body;
    if (dates && hid) {
      const entry = await pool.query(
        format(
          'DELETE FROM "entry" \
          WHERE date IN (%L) \
          AND hid=%L',
          dates,
          hid
        )
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
    const { note, date } = req.body;
    // TODO: NOT SQL INJECTION SAFE
    if (hid && note && date) {
      const notes = await pool.query(
        `INSERT INTO "notes" (hid, note, date) \
        VALUES ($1, $2, TO_DATE($3, 'DD/MM/YYYY'))`,
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
    const { noteId } = req.body;
    if (noteId) {
      const notes = await pool.query(
        `DELETE FROM "notes" \
        WHERE id=$1`,
        [noteId]
      );
      res.json(notes.rows);
    } else {
      res.sendStatus(404);
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
  createEntries,
  deleteEntry,
  deleteEntries,
  createNote,
  deleteNote,
  getNotes,
  getEntry,
};
