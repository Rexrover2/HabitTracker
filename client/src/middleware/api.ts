import { instance } from './auth';
import * as endpoints from './endpoints';
export interface HabitData {
  dateEnded?: string;
  dateStarted: string;
  hid: number;
  iconNo: number;
  name: string;
  streakGoal?: number;
  username: string;
}

export const getUsername = async () => {
  let data: any;
  await instance
    .get(endpoints.username)
    .then((res) => {
      data = res.data;
      data = data[0].username ? data[0].username : null;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

/** Functions for Habit related data*/
export const getAllByUser = async (username: string) => {
  try {
    let habits: HabitData[] = await getHabitsByUser(username);
    let entries: any = await getEntriesByUser(username);
    let notes: any = await getNotesByUser(username);

    let data = {
      habits,
      entries,
      notes,
    };

    console.log(data);
    return data;
  } catch (e) {
    console.error('Error fetching data!');
    return { habits: null, entries: null, notes: null };
  }
};

export const getHabitsByUser = async (username: string) => {
  let data: any;
  await instance
    .get(endpoints.habitsById(username))
    .then((res) => {
      console.log(res.data);
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

/* interface HabitData {
  name: string;
  iconNo: number;
  dateStarted: string;
  dateEnded?: string;
  streakGoal?: number;
}
 */
export const createHabitbyUser = async (username: string, props: any) => {
  await instance
    .post(endpoints.habitsById(username), props)
    .then(() => {
      console.log('New habit created!');
      return getHabitsByUser(username);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteHabitById = async (hid: string, name: string) => {
  await instance
    .delete(endpoints.habit, {
      data: { hid },
    })
    .then(() => {
      console.log(`${name} deleted!`);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getNotesByUser = async (username: string) => {
  let data: any;
  await instance
    .get(endpoints.notesByUser(username))
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

export const getNotesByHid = async (hid: string) => {
  let data: any;
  await instance
    .get(endpoints.notesByHid(hid))
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
    .post(endpoints.notesByHid(hid), notesData)
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

export const getEntriesByUser = async (username: string) => {
  let data: any;
  await instance
    .get(endpoints.entriesByUser(username))
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

export const getEntriesByHid = async (hid: string) => {
  let data: any;
  await instance
    .get(endpoints.entryByHid(hid))
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
    .post(endpoints.entryByHid(hid), entryData)
    .then(() => {
      console.log('Entry created!');
      data = getEntriesByHid(hid);
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

export const createEntries = async (hid: string, dates: string[]) => {
  await instance
    .post(endpoints.entriesByHid(hid), { dates })
    .then(() => {
      console.log(`Created entries for ${dates}`);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteEntryById = async (entryId: string, hid: string) => {
  let data: any;
  await instance
    .delete(endpoints.habit + endpoints.entry, {
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

export const deleteEntries = async (hid: string, dates: string[]) => {
  await instance
    .delete(endpoints.habit + endpoints.entries, {
      data: { hid: parseInt(hid), dates },
    })
    .then(() => {
      console.log(`Deleted entries for ${dates}`);
    })
    .catch((error) => {
      console.error(error);
    });
};
