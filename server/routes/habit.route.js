// Router for habits
// Operators: CRUD (Create, Read, Update, Delete)

const pool = require('../db');
const router = require('express').Router();
const habitController = require('../controller/habit.controller');
const jwtCheck = require('../auth');

router.all('/*', (req, res, next) => {
  if (['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    jwtCheck(req, res, next);
  } else {
    next();
  }
});

router.get('/:username', habitController.getHabits);

// POST create new habit - /:username
router.post('/:username', habitController.createHabit);

// TODO: PATCH modify habit information - /

// DELETE specific user's habit - /
router.delete('/', habitController.deleteHabit);

// GET current steak in days - /

// GET longest steak in days - /

// POST create a new entry for a given habit - /entry/:hid
router.post('/entry/:hid', habitController.createEntry);

// DELETE an entry for a given date - /entry
router.delete('/entry', habitController.deleteEntry);

// POST create a new note- /note/:hid
router.post('/note/:hid', habitController.createNote);

// DELETE a note - /note/:id
router.delete('/note', habitController.deleteNote);

// PATCH edit existing comment for given time and date - /

// GET Get all note instances for a given habit - /note/:hid
router.get('/note/:hid', habitController.getNotes);

module.exports = router;
