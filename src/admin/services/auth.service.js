import { GET, POST } from '../api/fetch-api';
import { API_URL } from '../configs/api.config';

export const authService = {
  register: async ({ username, email, password }) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    console.log(formData);
    return POST(`${API_URL}/auth/register`, formData);
  },

  login: async ({ email, password }) => {
    return POST(`${API_URL}/auth/login`, {
      email,
      password,
    });
  },

  verify: async () => {
    return GET(`${API_URL}/auth/verify`);
  },

  refresh: async () => {
    return GET(`${API_URL}/auth/refresh`);
  },
};
