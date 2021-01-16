// Router for habits
// Operators: CRUD (Create, Read, Update, Delete)

const router = require('express').Router();
const habitController = require('../controller/habit.controller');

// GET Habits by uid (via token)
router.get('/', habitController.getHabits);

// POST create new habit by uid (via token)
// NOTE: the inclusion of username in url is extra potential evidence that req came from app.
router.post('/:username', habitController.createHabit);

// PATCH modify habit information - /

// DELETE specific user's habit - /
router.delete('/', habitController.deleteHabit);

// GET current steak in days - /

// GET longest steak in days - /

// GET all notes for a given uid (via token)
router.get('/note/multi', habitController.getNotesByUser);

// GET all entries for a given uid (via token)
router.get('/entry/multi', habitController.getEntriesByUser);

// POST create new entries for a given habit - /entries/multi/:hid
router.post('/entry/multi/:hid', habitController.createEntries);

// DELETE an entry for a given date - /entry/multi
router.delete('/entry/multi/:hid', habitController.deleteEntries);

// POST create a new note- /note/:hid
router.post('/note/:hid', habitController.createNote);

// DELETE a note - /note/:id
router.delete('/note', habitController.deleteNote);

// PATCH edit existing comment for given time and date - /

module.exports = router;
