import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import paymentReducer from './paymentSlice';
import {userReducer } from './userSlice'
import { userProfileReducer } from './loggedInUserSlice';
import  updateMeReducer from './updateMeSlice'
import virtualAccountReducer from "./transferPaymentSlice";
import transactionReducer from "./transactionSlice";
import chooseTransactionReducer from "./chooseTransactionSlice";


const rootReducer = combineReducers({
  auth: authReducer,
  payment: paymentReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  updateMe: updateMeReducer,
  virtualAccount: virtualAccountReducer,
  transaction: transactionReducer,
  chooseTransaction: chooseTransactionReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;