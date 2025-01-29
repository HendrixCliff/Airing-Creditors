import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initiatePayment, verifyPayment } from './fetchData'; 
import type { PaymentResponse} from '../redux/fetchData'; 

interface PaymentState {
  loading: boolean;
  error: string | null;
  paymentData: PaymentResponse | null;
  transactionId: string | null
  phoneNumber: string | null;
  amount: number | null;
  status: string | null; 
}
 interface VerifyPaymentResponse {
  verifyStatus: string;
  transaction_id: string | null
  phoneNumber: string | null;
  amount: number | null;
  date: string | null
}


const initialState: PaymentState = {
  loading: false,
  error: null,
  paymentData: null,
  verificationStatus: null,
  transactionId: null,
  phoneNumber: null,
  amount: null,
  status: null
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
        Object.assign(state, action.payload);

      })
      .addCase(initiatePayment.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Payment failed';
      });

      builder
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verificationStatus = null;
      })
      .addCase(
        verifyPayment.fulfilled,
        (state, action: PayloadAction<VerifyPaymentResponse>) => {
          state.loading = false;
          Object.assign(state, action.payload);
           localStorage.setItem('airtimeResponse', JSON.stringify(action.payload));
          state.error = null;
        }
      )
      .addCase(verifyPayment.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Payment verification failed';
        state.verificationStatus = null;
      });
  },
});

export default paymentSlice.reducer;