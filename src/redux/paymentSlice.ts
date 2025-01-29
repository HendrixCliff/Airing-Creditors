import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initiatePayment, verifyPayment } from './fetchData';
import type { PaymentResponse } from './fetchData';

interface PaymentState {
  loading: boolean;
  error: string | null;
  paymentData: PaymentResponse | null;
  transactionId: string | null;
  phoneNumber: string | null;
  amount: number | null;
  status: string | null;
  date: string | null;
}

interface VerifyPaymentResponse {
  status: string;
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
        state.error = typeof action.payload === 'string' ? action.payload : 'Payment failed';
      });

    builder
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action: PayloadAction<VerifyPaymentResponse>) => {
        state.loading = false;
        state.error = null;
        state.status = action.payload.status;
        state.transactionId = action.payload.transactionId;
        state.phoneNumber = action.payload.phoneNumber;
        state.amount = action.payload.amount;
        state.date = action.payload.date;
        
        // Store verification response in paymentData
        state.paymentData = {
          transactionId: action.payload.transactionId!,
          phoneNumber: action.payload.phoneNumber!,
          amount: action.payload.amount!,
          status: action.payload.status,
        };
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Payment verification failed';
      });
  },
});

export default paymentSlice.reducer;
