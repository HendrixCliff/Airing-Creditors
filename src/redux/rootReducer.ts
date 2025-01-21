import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import paymentReducer from './paymentSlice';
import { userReducer } from './userSlice'
import airtimeReducer from './airtimeSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  payment: paymentReducer,
  user: userReducer,
  airtime: airtimeReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;