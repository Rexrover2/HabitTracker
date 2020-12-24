import { instance, getAccessToken } from './auth';
import * as endpoints from './endpoints';

const token = getAccessToken('Initial token');

/** Functions for Habit related data*/
export const getHabitsByUser = async (username: string) => {
  return await instance
    .get(endpoints.habitsById(username), {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .then((res) => {
      console.log(res.data);
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
  console.log(props);
  const res: any = await instance
    .post(endpoints.habitsById(username), props, {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(res.data);
};
