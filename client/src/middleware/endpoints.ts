export const baseURL =
  process.env
    .REACT_APP_BASE_URL; /* || 'https://camelcase-itproject.herokuapp.com/api' */

/** User Endpoints*/
export const user = '/user';
export const signup = user + '/signup';
export const login = user + '/login';
export const logout = user + '/logout';
export const logoutAll = logout + '/all';

/** Habit Endpoints*/
export const habit = '/habit';
export const habitsById = (userId: string) => habit + '/' + userId;
export const currentStreak = '/currentStreak';
export const longestStreak = '/longestStreak';

export const note = '/note';
export const notesByHid = (hid: string) => habit + note + '/' + hid;

export const entry = '/entry';
export const entryByHid = (hid: string) => habit + entry + '/' + hid;
