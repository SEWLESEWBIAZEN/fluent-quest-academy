import authReducer from './auth/authSlice';
import { combineReducers } from '@reduxjs/toolkit';
import courseReducer from './courseSlice'

const store = combineReducers({
   auth: authReducer,
   course: courseReducer,
  });

export default store;
