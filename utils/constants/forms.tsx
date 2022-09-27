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
