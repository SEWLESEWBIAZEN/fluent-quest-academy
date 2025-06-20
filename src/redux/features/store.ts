import authReducer from '../features/auth/authSlice';
import { combineReducers } from '@reduxjs/toolkit';

const store = combineReducers({
   user: authReducer,
  });

export default store;
