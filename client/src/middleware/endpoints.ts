export const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.LOCAL
    : process.env.REACT_APP_BASE_URL;

/** User Endpoints*/
export const user = '/user';
export const username = user + '/username';
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
export const notes = habit + '/note/multi';
export const notesByHid = (hid: string) => habit + note + '/' + hid;

export const entry = '/entry';
export const entries = habit + '/entry/multi';
export const entriesByHid = (hid: string) => entries + '/' + hid;
export const entryByHid = (hid: string) => habit + entry + '/' + hid;
