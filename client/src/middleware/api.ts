import { instance, getAccessToken } from './auth';
import * as endpoints from './endpoints';

const token = getAccessToken('Initial token');

interface HabitData {
  dateEnded?: string;
  dateStarted: string;
  hid: number;
  iconNo: number;
  name: string;
  streakGoal?: number;
  username: string;
}

/** Functions for Habit related data*/
export const getAllByUser = async (username: string) => {
  let habits: HabitData[] = await getHabitsByUser(username);
  let entries: any = [];
  let notes: any = [];

  habits.map((inst) =>
    getEntriesByHid(`${inst.hid}`).then((data) => {
      entries.push(data);
    })
  );

  habits.map((inst) =>
    getNotesByHid(`${inst.hid}`).then((data) => notes.push(data))
  );

  let data = {
    habits,
    entries,
    notes,
  };

  console.log(data);
  return data;
};

export const getHabitsByUser = async (username: string) => {
  let data: any;
  await instance
    .get(endpoints.habitsById(username), {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .then((res) => {
      console.log(res.data);
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
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

export const getNotesByHid = async (hid: string) => {
  let data: any;
  await instance
    .get(endpoints.notesByHid(hid), {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .then((res) => {
      // console.log(res.data);
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

interface NotesData {
  note: string;
  date: string;
}

export const createNotebyHid = async (hid: string, notesData: NotesData) => {
  await instance
    .post(endpoints.notesByHid(hid), notesData, {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .then(() => {
      console.log('Note created!');
      return getNotesByHid(hid);
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
      return getNotesByHid(hid);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getEntriesByHid = async (hid: string) => {
  let data: any;
  await instance
    .get(endpoints.entryByHid(hid), {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .then((res) => {
      // console.log(res.data);
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

interface EntryData {
  date: string;
}

export const createEntryByHid = async (hid: string, entryData: EntryData) => {
  let data: any;
  await instance
    .post(endpoints.entryByHid(hid), entryData, {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .then(() => {
      console.log('Entry created!');
      data = getEntriesByHid(hid);
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

export const deleteEntryById = async (entryId: string, hid: string) => {
  let data: any;
  await instance
    .delete(endpoints.habit + endpoints.entry, {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
      data: { entryId },
    })
    .then(() => {
      console.log('Entry deleted!');
      data = getEntriesByHid(hid);
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};
