import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initiatePayment, verifyPayment } from './fetchData';
import type { PaymentResponse } from '../redux/fetchData';

interface PaymentState {
  loading: boolean;
  error: string | null;
  paymentData: PaymentResponse | null;
  transactionId: string | null;
  phoneNumber: string | null;
  amount: number | null;
  status: string | null;
  verifyStatus: string | null;
  date: string | null;
}

interface VerifyPaymentResponse {
  verifyStatus: string;
  transactionId: string | null;
  phoneNumber: string | null;
  amount: number | null;
  date: string | null;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  paymentData: null,
  transactionId: null,
  phoneNumber: null,
  amount: null,
  status: null,
  verifyStatus: null,
  date: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.paymentData = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action: PayloadAction<PaymentResponse>) => {
        state.loading = false;
        state.error = null;
        state.paymentData = action.payload;
        state.transactionId = action.payload.transactionId;
        state.phoneNumber = action.payload.phoneNumber;
        state.amount = action.payload.amount;
        state.status = action.payload.status;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Payment failed';
      });

    builder
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verifyStatus = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action: PayloadAction<VerifyPaymentResponse>) => {
        state.loading = false;
        state.error = null;
        state.verifyStatus = action.payload.verifyStatus;
        state.transactionId = action.payload.transaction_id;
        state.phoneNumber = action.payload.phoneNumber;
        state.amount = action.payload.amount;
        state.date = action.payload.date;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Payment verification failed';
        state.verifyStatus = null;
      });
  },
});

export default paymentSlice.reducer;
