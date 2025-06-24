import authReducer from '../features/auth/authSlice';
import { combineReducers } from '@reduxjs/toolkit';

const store = combineReducers({
   auth: authReducer,
  });

export default store;
