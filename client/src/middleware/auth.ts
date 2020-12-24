import axios, { AxiosAdapter } from 'axios';
import * as endpoints from './endpoints';
import { cacheAdapterEnhancer } from 'axios-extensions';

const authData = {
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
  grant_type: 'client_credentials',
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
};

export const getAccessToken = async (message: string) => {
  console.log(message);
  const res = await axios.post(
    `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
    authData
  );
  // const token = await res.data['access_token'];
  return res.data['access_token'] as string;
};

export const instance = axios.create({
  baseURL: endpoints.baseURL,
  headers: {
    'Cache-Control': 'no-cache',
  },
  // cache will be enabled by default
  adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter),
});

// Code snippet from https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        getAccessToken('refresh').then((newToken) => {
          isRefreshing = false;
          onRrefreshed(newToken);
          console.log(refreshSubscribers);
          refreshSubscribers = [];
        });
      }

      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((token) => {
          // replace the expired token and retry
          originalRequest.headers['Authorization'] = 'Bearer ' + token;

          console.log(originalRequest);
          resolve(axios(originalRequest));
        });
      });

      return retryOrigReq;
    } else {
      return Promise.reject(error);
    }
  }
);

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRrefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
};
