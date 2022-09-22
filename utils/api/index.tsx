import { LoginDataType, SchoolType } from '@/types/index';
import httpRequest, { NextRequestType } from '@/services/HttpClient';

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
  findById: id => httpRequest.get(`/api/schools/${id}`),
  create: (data: SchoolType) => withCsrf(() => httpRequest.post('/api/schools/create', { data })),
  edit: (id, data: SchoolType) => withCsrf(() => httpRequest.put(`/api/schools/${id}/edit`, { data })),
  delete: id => withCsrf(() => httpRequest.delete(`/api/schools/${id}/delete`)),
};
