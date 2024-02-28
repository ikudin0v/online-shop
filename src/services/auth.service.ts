import axios from 'axios';
import { toast } from 'react-toastify';
import localStorageService from './localStorage.service';
import { CONFIG } from '../config';
import { generateAuthError } from '../utils/generateAuthErrors';

export const httpAuth = axios.create({
  baseURL: CONFIG.IS_FIREBASE ? 'https://identitytoolkit.googleapis.com/v1/' : CONFIG.API_URL + 'auth/',
  params: { key: process.env.REACT_APP_FIREBASE_KEY },
});

httpAuth.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response && err.response.status >= 400 && err.response.status < 600) {
      console.log('Unexpected error: ' + err.response.data.error.message);
      toast.error('Ошибка сервера [' + err.response.status + '].\n' + generateAuthError(err.response.data.error.message));
    }
    return Promise.reject(err);
  }
);

const authService = {
  signUp: async (payload:any) => {
    const { data } = await httpAuth.post(CONFIG.IS_FIREBASE ? 'accounts:signUp' : 'signUp', {
      ...payload,
      returnSecureToken: true,
    });
    return data;
  },

  logIn: async ({ email, password }:{email:string, password:string}) => {
    const { data } = await httpAuth.post(CONFIG.IS_FIREBASE ? 'accounts:signInWithPassword' : 'signInWithPassword', {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },

  refresh: async () => {
    const { data } = await httpAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  }
}

export default authService;