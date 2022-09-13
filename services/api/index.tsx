import httpRequest from '../HttpClient';
import { AxiosPromise } from 'axios';

export const csrfToken = async () => {
  try {
    await httpRequest.get('/sanctum/csrf-cookie');
  } catch (error) {
    throw new Error('Failed to get Csrf token');
  }
};

const withCsrf = async (nextRequest: () => AxiosPromise) => {
  await csrfToken();
  return nextRequest();
};

export const auth = {
  login: async (data: { email: string; password: string }) => withCsrf(() => httpRequest.post('/login', { data })),
};
