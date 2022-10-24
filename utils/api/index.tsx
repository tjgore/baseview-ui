import type { LoginDataType } from '@/types/index';
import type { SchoolType } from '@/types/schools';
import type { ProfileFormType } from '@/types/profiles';
import type { InviteType } from '@/types/invites';
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
  register: (data: { [name: string]: string | number | undefined }) => httpRequest.post('/register', { data }),
};

export const schools = {
  // Rename all to myschools?
  all: () => httpRequest.get('/api/schools'),
  findById: id => httpRequest.get(`/api/schools/${id}`),
  create: (data: SchoolType) => withCsrf(() => httpRequest.post('/api/schools/create', { data })),
  edit: (id, data: SchoolType) => withCsrf(() => httpRequest.put(`/api/schools/${id}/edit`, { data })),
  delete: id => withCsrf(() => httpRequest.delete(`/api/schools/${id}/delete`)),
};

export const roles = {
  school: () => httpRequest.get('/api/roles'),
  update: (id: string, userId: string, data: { roles: number[] }) => withCsrf(() => httpRequest.put(`/api/schools/${id}/accounts/${userId}/role`, { data })),
};

export const invites = {
  create: (data: InviteType) => withCsrf(() => httpRequest.post('/api/invites', { data })),
  findByToken: (token: string) => httpRequest.get(`/api/invites/${token}`),
};

export const profiles = {
  get: () => httpRequest.get('/api/profiles'),
  create: (data: { [name: string]: string | null | undefined }) => httpRequest.post('/api/profiles', { data }),
  edit: (data: ProfileFormType) => httpRequest.put('/api/profiles', { data }),
};

export const accounts = {
  get: (id: string, query: string) => httpRequest.get(`/api/schools/${id}/accounts?${query}`),
  find: (id: string, userId: string) => httpRequest.get(`/api/schools/${id}/accounts/${userId}`),
  updateProfile: (id: string, profileId: string, data: ProfileFormType) => withCsrf(() => httpRequest.put(`/api/schools/${id}/profiles/${profileId}`, { data })),
};

export const overview = {
  count: (id: string) => httpRequest.get(`/api/schools/${id}/overview/count`),
};
