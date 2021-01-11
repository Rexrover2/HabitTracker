import axios from 'axios';
import * as endpoints from './endpoints';
import firebase from '../auth/firebaseConfig';

export const instance = axios.create({
  baseURL: endpoints.baseURL,
});

instance.interceptors.request.use(async (config) => {
  const curUser = firebase.auth().currentUser;
  console.log('interceptor called');

  if (curUser !== null) {
    console.log('user LoggedIn!');
    const token = await curUser.getIdToken(true);
    config.headers.Authorization = 'Bearer ' + token;
  } else {
    console.error('no user logged in');
  }
  return config;
});
