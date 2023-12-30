import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken } from '../../utils/token/token';
import { authService } from '../../services/auth.service';

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authService.register(data);

      console.log('Registration Response:', response);

      if (response.data) {
        const token = response.data.accessToken;
        console.log('Access Token:', token);
        saveToken(token);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login({
        email,
        password,
      });

      console.log(response);
      if (response.data) {
        const token = response.data.accessToken;
        saveToken(token);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verify = createAsyncThunk(
  'auth/verify',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.verify();
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
