import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import paymentReducer from './paymentSlice';
import {userReducer } from './userSlice'
import airtimeReducer from './airtimeSlice'
import { userProfileReducer } from './loggedInUserSlice';
import { updateMeReducer } from './updateMeSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  payment: paymentReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  airtime: airtimeReducer,
  updateMe: updateMeReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;