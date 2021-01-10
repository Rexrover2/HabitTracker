import axios from 'axios';
import firebase from 'firebase';
import * as endpoints from './endpoints';
import firebaseConfig from '../auth/firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export const instance = axios.create({
  baseURL: endpoints.baseURL,
});

instance.interceptors.request.use(function (config) {
  const curUser = firebase.auth().currentUser;
  console.log('interceptor called');

  if (curUser !== null) {
    console.log('userLoggedIn');
    const token = curUser.getIdToken(true);
    config.headers.Authorization = token;
  } else {
    console.error('no user logged in');
  }
  return config;
});
