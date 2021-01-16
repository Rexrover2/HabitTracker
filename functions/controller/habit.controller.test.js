const {
  compareJSON,
  testSuiteWrapper,
  callEndpoints,
} = require('./utils.controller');
const {
  getHabits,
  createHabit,
  deleteHabit,
  createEntry,
  deleteEntry,
  createNote,
  deleteNote,
  getNotes,
} = require('./habit.controller');

const habitData = {
  username: 'test',
};

const testGetHabits = async (body, status) => {
  const actual = callEndpoints(getHabits, { body });
  compareJSON(actual, {});
};

testSuiteWrapper('Habit Tests', async () => {
  it('should get habit data of user bob', async () => {
    await testGetHabits(habitData, 400);
  });
});
