export const isAuthSelector = (state) => state.auth.isAuth;
export const isErrorSelector = (state) => state.auth.isError;
export const isLoadingSelector = (state) => state.auth.isLoading;
export const userSelector = (state) => state.auth.user;
export const isVerifiedSelector = (state) => state.auth.isVerified;
export const isLicenseAcceptedSelector = (state) =>
  state.auth.isLicenseAccepted;
