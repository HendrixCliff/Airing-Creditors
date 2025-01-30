import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initiatePayment, verifyPayment } from './fetchData';

// ✅ Ensure PaymentResponse matches API response
interface PaymentResponse {
  transactionId: string;
  phoneNumber: string;
  amount: number;
  status: string;
  date?: string; // Optional field
}

interface PaymentState {
  loading: boolean;
  error: string | null;
  transactionId: string | null;
  phoneNumber: string | null;
  amount: number | null;
  status: string | null;
  date: string | null;
  verifyStatus: string | null;
}

interface VerifyPaymentResponse {
  status: string;
  transactionId: string;
  phoneNumber: string;
  amount: number;
  date: string;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  transactionId: null,
  phoneNumber: null,
  amount: null,
  status: null,
  date: null,
  verifyStatus: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Handle initiatePayment correctly
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action: PayloadAction<PaymentResponse>) => {
        state.loading = false;
        state.error = null;
        state.transactionId = action.payload.transactionId;
        state.phoneNumber = action.payload.phoneNumber;
        state.amount = action.payload.amount;
        state.status = action.payload.status;
        state.date = action.payload.date || null; // Handle optional field
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Payment failed';
      });

    builder
      // ✅ Handle verifyPayment correctly
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action: PayloadAction<VerifyPaymentResponse>) => {
        state.loading = false;
        state.error = null;
        state.verifyStatus = action.payload.status; // ✅ Correctly reference `status`
        state.transactionId = action.payload.transactionId;
        state.phoneNumber = action.payload.phoneNumber;
        state.amount = action.payload.amount;
        state.date = action.payload.date;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Payment verification failed';
      });
  },
});

export default paymentSlice.reducer;
