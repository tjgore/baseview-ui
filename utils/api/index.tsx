import { LoginDataType } from '../../types';
import httpRequest, { NextRequestType } from '../../services/HttpClient';

export const csrfToken = async () => {
  try {
    await httpRequest.get('/sanctum/csrf-cookie');
  } catch (error) {
    throw new Error('Failed to get Csrf token');
  }
};

const withCsrf = async (nextRequest: NextRequestType) => {
  await csrfToken();
  return nextRequest();
};

export const auth = {
  login: (data: LoginDataType) => withCsrf(() => httpRequest.post('/login', { data })),
  logout: () => httpRequest.post('/logout'),
  user: () => withCsrf(() => httpRequest.get('/api/user')),
};

export const schools = {
  all: () => httpRequest.get('/api/schools'),
};
