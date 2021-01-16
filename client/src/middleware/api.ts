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
    let habits: HabitData[] = await getHabitsByUser();
    let entries: any = await getEntriesByUser();
    let notes: any = await getNotesByUser();

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

export const getHabitsByUser = async () => {
  let data: any;
  await instance
    .get(endpoints.habit)
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
      return getHabitsByUser();
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

export const getNotesByUser = async () => {
  let data: any;
  await instance
    .get(endpoints.notes)
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

/* interface NotesData {
  note: string;
  date: string;
} */

export const getEntriesByUser = async () => {
  let data: any;
  await instance
    .get(endpoints.entries)
    .then((res) => {
      data = res.data;
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

export const deleteEntries = async (hid: string, dates: string[]) => {
  await instance
    .delete(endpoints.entries, {
      data: { hid: parseInt(hid), dates },
    })
    .then(() => {
      console.log(`Deleted entries for ${dates}`);
    })
    .catch((error) => {
      console.error(error);
    });
};
