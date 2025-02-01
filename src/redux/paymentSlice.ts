import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './rootReducer';

// ✅ Define API response types
interface PaymentResponse {
  transactionId: string;
  phoneNumber: string;
  amount: number;
  status: string;
  date?: string; // Optional field
}

interface VerifyPaymentResponse {
  status: string;
  transactionId: string;
  phoneNumber: string;
  amount: number;
  date: string;
}


// ✅ Payment state in Redux store
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

export interface PaymentPayload {
  amount: number;
  phoneNumber: string;
  currency?: string;
}
interface VerifyPaymentPayload {
  transactionId?: string;
  amount?: number;
  phoneNumber?: string;
}

export const initiatePayment = createAsyncThunk<
  PaymentResponse,
  PaymentPayload,
  { rejectValue: string; state: RootState }
>(
  'payment/initiatePayment',
  async (payload, { rejectWithValue, getState }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue('Authentication token is missing. Please log in.');
    }

    try {
      const response = await axios.post(
        `https://fe83-105-112-178-30.ngrok-free.app/api/v1/payment/initiatePayment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Payment initiation failed');
      }
      return rejectWithValue('An unexpected error occurred while processing the payment.');
    }
  }
);

export const verifyPayment = createAsyncThunk<VerifyPaymentResponse, VerifyPaymentPayload, { rejectValue: string; state: RootState }>(
  'payment/verifyPayment',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`https://fe83-105-112-178-30.ngrok-free.app/api/v1/payment/verifyPayment`, {
        headers: { Authorization: `Bearer ${token}` },
        params: payload,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Payment verification failed');
    }
  }
);




// ✅ Redux Slice
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle Initiate Payment
    builder
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
        state.date = action.payload.date || null; // ✅ Handle optional field
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Payment failed';
      });

    // Handle Verify Payment
    builder
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action: PayloadAction<VerifyPaymentResponse>) => {
        state.loading = false;
        state.error = null;
        state.verifyStatus = action.payload.status;
        state.transactionId = action.payload.transactionId;
        state.phoneNumber = action.payload.phoneNumber;
        state.amount = action.payload.amount;
        state.date = action.payload.date;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Payment verification failed';
      });
  },
});

export default paymentSlice.reducer;
