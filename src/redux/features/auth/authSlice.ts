import  {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string; token: string; name: string }>) => {
      state.isAuthenticated = true;
      state.user = { email: action.payload.email, name: action.payload.name };
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectIsAuthenticated = (state: { auth: typeof initialState }) => state.auth.isAuthenticated;
export const selectUser = (state: { auth: typeof initialState }) => state.auth.user;
export const selectToken = (state: { auth: typeof initialState }) => state.auth.token;

export default authSlice.reducer;
// This code defines a Redux slice for authentication, including actions for logging in and logging out.
// The initial state indicates that the user is not authenticated and has no user data.     