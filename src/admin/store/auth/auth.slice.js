import { createSlice } from '@reduxjs/toolkit';
import { login, register, verify } from './auth.actions';

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isVerified: false,
  isAuth: false,
  isLicenseAccepted: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    patchUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      console.log(state.user);
      state.isLoading = false;
      state.isError = false;
      state.isVerified = true;
      state.isAuth = true;
      state.isLicenseAccepted = true;
    });
    builder.addCase(register.rejected, (state) => {
      state.user = null;
      state.isLoading = false;
      state.isError = true;
      state.isLicenseAccepted = false;
      state.isAuth = false;
      state.isVerified = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      console.log(state.user);
      state.isLoading = false;
      state.isError = false;
      state.isVerified = true;
      state.isAuth = true;
      state.isLicenseAccepted = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.user = null;
      console.log(state.user);
      state.isLoading = false;
      state.isError = true;
      state.isVerified = false;
      state.isAuth = false;
      state.isLicenseAccepted = false;
    });
    builder.addCase(verify.fulfilled, (state, action) => {
      state.isVerified = true;
      state.user = action.payload;
      state.isAuth = true;
      state.isError = false;
      state.isLoading = false;
      state.isLicenseAccepted = true;
    });
    builder.addCase(verify.rejected, (state) => {
      state.isVerified = true;
      state.user = null;
      state.isAuth = false;
      state.isError = true;
      state.isLoading = false;
      state.isLicenseAccepted = true;
    });
  },
});

export const { patchUser } = AuthSlice.actions;
export default AuthSlice.reducer;
