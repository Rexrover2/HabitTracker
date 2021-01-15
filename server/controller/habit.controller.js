const pool = require('../db');
const format = require('pg-format');

const getHidsByUid = async (req, res) => {
  try {
    const { uid } = req;
    const habits = await pool.query(
      `SELECT hid FROM "habit" \
      WHERE uid = $1;`,
      [uid]
    );
    return habits.rows;
  } catch {
    res.sendStatus(400);
  }
};

const getHabits = async (req, res) => {
  try {
    const { uid } = req;
    const habits = await pool.query(
      `SELECT * FROM "habit" \
      WHERE uid = $1;`,
      [uid]
    );
    res.json(habits.rows);
  } catch {
    res.sendStatus(400);
  }
};

const createHabit = async (req, res) => {
  try {
    const { uid } = req;
    const { name, dateStarted, dateEnded, streakGoal, iconNo } = req.body;

    if (username && name && dateStarted && iconNo) {
      const habits = await pool.query(
        `INSERT INTO "habit" (name, uid, "dateStarted", "dateEnded", "streakGoal", "iconNo") \
        VALUES ($1, $2, TO_DATE($3, 'DD/MM/YYYY'), TO_DATE($4, 'DD/MM/YYYY'), $5, $6);`,
        [name, uid, dateStarted, dateEnded, streakGoal, iconNo]
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
    const { uid } = req;
    const { hid } = req.body;
    if (uid && hid) {
      const habits = await pool.query(
        `DELETE FROM habit h
        INNER JOIN "User" u 
          ON h.uid = u.uid 
        WHERE hid=$1
          AND u.uid=$2;`,
        [hid, uid]
      );
      res.json(habits.rows);
    } else {
      res.sendStatus(400);
    }
  } catch {
    res.sendStatus(400);
  }
};

const getNotesByUser = async (req, res) => {
  try {
    const { uid } = req;
    if (uid) {
      const notes = await pool.query(
        `SELECT n.hid,n."date", n.note FROM notes n
        INNER JOIN habit h ON n.hid = h.hid 
        WHERE uid=$1
        ORDER BY n.hid`,
        [uid]
      );
      res.json(notes.rows);
    } else {
      res.sendStatus(400);
    }
  } catch {
    res.sendStatus(400);
  }
};

const getEntriesByUser = async (req, res) => {
  try {
    const { uid } = req;
    if (uid) {
      const entries = await pool.query(
        `SELECT h.hid, e."date" FROM entry e 
        INNER JOIN habit h 
          ON e.hid = h.hid 
        WHERE uid=$1
        ORDER BY h.hid`,
        [uid]
      );
      res.json(entries.rows);
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(400);
  }
};

const createEntries = async (req, res) => {
  try {
    const { hid } = req.params;
    const { dates } = req.body;

    // Checks if hid belongs to the user specified by uid in header auth token.
    const hids = await getHidsByUid(req, res);

    if (hid && dates && hids.includes(hid)) {
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

const deleteEntries = async (req, res) => {
  try {
    const { hid } = req.params;
    const { dates } = req.body;

    // Checks if hid belongs to the user specified by uid in header auth token.
    const hids = await getHidsByUid(req, res);

    if (dates && hid && hids.includes(hid)) {
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

// TODO: Replace with a createNotes
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

// TODO: Replace with a deleteNotes
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

module.exports = {
  getEntriesByUser,
  getHabits,
  getNotesByUser,
  createHabit,
  deleteHabit,
  createEntries,
  deleteEntries,
  createNote,
  deleteNote,
};
