import { instance, getAccessToken } from './auth';
import * as endpoints from './endpoints';

const token = getAccessToken('Initial token');

/** Functions for Habit related data*/
export const getHabitsByUser = async (username: string) => {
  await instance
    .get(endpoints.habitsById(username), {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

interface HabitData {
  name: string;
  iconno: number;
  datestarted: string;
  dateended?: string;
  streakgoal?: number;
}

export const createHabitbyUser = async (username: string, props: HabitData) => {
  await instance
    .post(endpoints.habitsById(username), props, {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .then(() => {
      console.log('New habit created!');
      return getHabitsByUser(username);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteHabitById = async (hid: string, username: string) => {
  await instance
    .delete(endpoints.habit, {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
      data: { hid },
    })
    .then(() => {
      console.log('Habit deleted!');
      return getHabitsByUser(username);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getNotesById = async (hid: string) => {
  await instance
    .get(endpoints.notesByHid(hid), {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

interface NotesData {
  note: string;
  date: string;
}

export const createNotebyId = async (hid: string, notesData: NotesData) => {
  await instance
    .post(endpoints.notesByHid(hid), notesData, {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .then(() => {
      console.log('Note created!');
      return getNotesById(hid);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteNoteById = async (noteId: string, hid: string) => {
  await instance
    .delete(endpoints.habit + endpoints.note, {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
      data: { noteId },
    })
    .then(() => {
      console.log('Note deleted!');
      return getNotesById(hid);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getEntriesByHid = async (hid: string) => {
  await instance
    .get(endpoints.entryByHid(hid), {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

interface EntryData {
  date: string;
}

export const createEntryById = async (hid: string, entryData: EntryData) => {
  await instance
    .post(endpoints.entryByHid(hid), entryData, {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .then(() => {
      console.log('Entry created!');
      return getEntriesByHid(hid);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteEntryById = async (entryId: string, hid: string) => {
  await instance
    .delete(endpoints.habit + endpoints.entry, {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
      data: { entryId },
    })
    .then(() => {
      console.log('Entry deleted!');
      return getEntriesByHid(hid);
    })
    .catch((error) => {
      console.error(error);
    });
};
