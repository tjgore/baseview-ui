import { OptionsType } from '@/types/index';
import { ROLES, ROLE_IDS } from './roles';

export const inviteFields = {
  first_name: { rules: 'required|string' },
  last_name: { rules: 'present|string' },
  email: { rules: 'email|required' },
  role: { rules: 'required|integer' },
  school: { rules: 'required|integer' },
};

export const schoolFields = {
  name: { rules: 'string|required' },
  address: { rules: 'string|required' },
  email: { rules: 'required|email' },
  phone: { rules: 'string|required' },
  website: { rules: 'string|url|present' },
  about: { rules: 'string|present' },
  slogan: { rules: 'string|present' },
  principal: { rules: 'required|string' },
  vice_principal: { rules: 'string|present' },
};

export const loginFields = {
  email: {
    rules: 'required|email',
  },
  password: {
    rules: 'string|required',
  },
};

export const profileFields = {
  first_name: { rules: 'required|string' },
  last_name: { rules: 'required|string' },
  preferred_name: { rules: 'required|string' },
  gender: { rules: 'required|string|in:Male,Female,Neither' },
  dob: { rules: 'required|string' },
  email: { rules: 'required|email' },
  mobile: { rules: 'string|present' },
  address: { rules: 'required|string' },
};

export const genderOptions: OptionsType = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Neither', value: 'Neither' },
];

export const roleOptions: OptionsType = [
  { label: ROLES.ADMIN, value: ROLE_IDS.ADMIN },
  { label: ROLES.TEACHER, value: ROLE_IDS.TEACHER },
  { label: ROLES.STUDENT, value: ROLE_IDS.STUDENT },
];
