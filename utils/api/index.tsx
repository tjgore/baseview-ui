import type { LoginDataType } from '@/types/index';
import type { SchoolType } from '@/types/schools';
import type { ProfileFormType } from '@/types/profiles';
import type { InviteType, InvitationFormType } from '@/types/invites';
import { AccountFormType } from '@/types/accounts';
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
  create: (id: string, data: InviteType) => withCsrf(() => httpRequest.post(`/api/schools/${id}/invites`, { data })),
  findByToken: (token: string) => httpRequest.get(`/api/invites/${token}`),
  createAccount: (token: string, data: InvitationFormType) => withCsrf(() => httpRequest.post(`/api/invites/${token}`, { data })),
};

export const profiles = {
  get: () => httpRequest.get('/api/profiles'),
  edit: (data: ProfileFormType) => httpRequest.put('/api/profiles', { data }),
};

export const accounts = {
  get: (id: string, query: string) => httpRequest.get(`/api/schools/${id}/accounts?${query}`),
  find: (id: string, userId: string) => httpRequest.get(`/api/schools/${id}/accounts/${userId}`),
  updateProfile: (id: string, profileId: string, data: ProfileFormType) => withCsrf(() => httpRequest.put(`/api/schools/${id}/profiles/${profileId}`, { data })),
  create: (id: string, data: AccountFormType) => withCsrf(() => httpRequest.post(`/api/schools/${id}/accounts`, { data })),
  delete: (id: string, userId: string) => withCsrf(() => httpRequest.delete(`/api/schools/${id}/accounts/${userId}`)),
};

export const overview = {
  count: (id: string) => httpRequest.get(`/api/schools/${id}/overview/count`),
};
