import axios from 'axios';
import { toast } from 'react-toastify';
import { CONFIG } from '../config';
import localStorageService from './localStorage.service';

const myAxios = axios.create();

myAxios.interceptors.request.use(
  async function (config:any) {
    //console.log('config.url', config.url);
    const expireDate = localStorageService.getExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpire = refreshToken && expireDate < Date.now();

    // подмена url для firebase
    if (CONFIG.IS_FIREBASE) {
      const containEndSlash = /\/$/gi.test(config.url);
      if (containEndSlash) {
        config.url = config.url.slice(0, -1);
      }
      const containEndJson = /.json$/gi.test(config.url);
      if (!containEndJson) {
        config.url = config.url + '.json';
      }

      // if (isExpire) {
      //   // const data = await authService.refresh();

      //   localStorageService.setTokens({
      //     refreshToken: data.refresh_token,
      //     idToken: data.id_token,
      //     experiesIn: data.expires_in,
      //     localId: data.user_id,
      //   });
      // }

    //   const accessToken = localStorageService.getAccessToken();
    //   if (accessToken) {
    //     config.params = { ...config.params, auth: accessToken };
    //   }
    // } else {
    //   if (isExpire) {
    //     const data = await authService.refresh();
    //     console.log('myAxios.interceptors.request.use', data);
    //     localStorageService.setTokens({
    //       refreshToken: data.refreshToken,
    //       idToken: data.accessToken,
    //       experiesIn: data.experiesIn,
    //       localId: data.userId,
    //     });
    //   }

      // const accessToken = localStorageService.getAccessToken();
      // if (accessToken) {
      //   config.headers.Authorization = 'Bearer ' + accessToken;
      // }
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

// глобально отловим ошибки 5xx ("неожидаемые")
myAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response && err.response.status >= 400 && err.response.status < 600) {
      console.log('Unexpected error: ' + err.response);
      toast.error('Ошибка сервера [' + err.response.status + '].\n' + err.response.data.message);
    }
    return Promise.reject(err);
  }
);

const httpService = { get: myAxios.get, post: myAxios.post, put: myAxios.patch, delete: myAxios.delete };
export default httpService;
