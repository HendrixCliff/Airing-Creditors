import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import paymentReducer from './paymentSlice';
import {userReducer } from './userSlice'
import { userProfileReducer } from './loggedInUserSlice';
import  updateMeReducer from './updateMeSlice'
import virtualAccountReducer from "./transferPaymentSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  payment: paymentReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  updateMe: updateMeReducer,
  virtualAccount: virtualAccountReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;