import { instance, getAccessToken } from './auth';
import * as endpoints from './endpoints';

const token = getAccessToken('Initial token');

export const getHabitsByUser = async (username: string) => {
  const res: any = await instance
    .get(endpoints.habitsById(username), {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(res.data);
};

export const getHabitsByUser = async (username: string) => {
  const res: any = await instance
    .get(endpoints.habitsById(username), {
      headers: {
        Authorization: 'Bearer ' + (await token),
      },
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(res.data);
};
