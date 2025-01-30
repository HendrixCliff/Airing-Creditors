import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './rootReducer';

interface ResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordResponse {
  message: string;
}

interface VerifyPaymentPayload {
  transactionId?: string;
  amount?: number;
  phoneNumber?: string;
}

export interface VerifyPaymentResponse {
  verifyStatus: string;
  transactionId?: string;
  phoneNumber: string;
  amount: number
}

interface UpdatePasswordPayload {
  newPassword: string;
}

interface UpdatePasswordResponse {
  message: string;
}


interface LoginPayload {
  username: string;
  password: string;
}

interface SignupPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  country: string;
}

interface AuthResponse {
  username: string;
  token: string;
}

interface ProtectedResponse {
  message: string;
}

interface ForgotPasswordPayload {
  email: string;
}

interface ForgotPasswordResponse {
  message: string;
}

export interface PaymentPayload {
  amount: number;
  phoneNumber: string;
  currency?: string;
}

export interface PaymentResponse {
  transactionId: string;
  status: string;
  amount: number;
  phoneNumber: string;
  referenceId?: string; // Optional field
  message?: string; // API response message
}

export interface FetchUserResponse {
  username: string;
  email: string;
  phoneNumber: string;
  country: string;
}

export const protectedData = createAsyncThunk<
  ProtectedResponse,
  void,
  { rejectValue: string; state: RootState }
>('auth/fetchProtectedData', async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.token;
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/protected`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Access denied');
  }
});

export const login = createAsyncThunk<AuthResponse, LoginPayload>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
        { username, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

export const signup = createAsyncThunk<AuthResponse, SignupPayload>(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/signup`,
        payload,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Signup failed');
    }
  }
);

export const forgotPassword = createAsyncThunk<ForgotPasswordResponse, ForgotPasswordPayload>(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/forgotPassword`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to request password reset');
    }
  }
);

export const resetPassword = createAsyncThunk<ResetPasswordResponse, ResetPasswordPayload, { rejectValue: string }>(
  'auth/resetPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/resetPassword/${payload.token}`,
        { password: payload.password, confirmPassword: payload.confirmPassword }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to reset password');
    }
  }
);

export const fetchLoggedInUser = createAsyncThunk<FetchUserResponse, void, { rejectValue: string; state: RootState }>(
  'userProfile/fetchLoggedInUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue('Authentication token not found');

      const response = await axios.get<FetchUserResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/userProfile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data) return rejectWithValue('User data is missing.');

      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user');
    }
  }
);
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
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/payment/initiatePayment`,
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
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/payment/verifyPayment`, {
        headers: { Authorization: `Bearer ${token}` },
        params: payload,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Payment verification failed');
    }
  }
);



export const updatePassword = createAsyncThunk<
  UpdatePasswordResponse,
  UpdatePasswordPayload,
  { rejectValue: string; state: RootState }
>(
  'auth/updatePassword',
  async ({ newPassword }, { rejectWithValue, getState }) => {
    const token = getState().auth.token; // ✅ Retrieve JWT from Redux state

    if (!token) {
      return rejectWithValue('Authentication token is missing. Please log in again.');
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/updatePassword`,
        { newPassword },
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Send JWT token in header
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to update password');
      }
      return rejectWithValue('An unexpected error occurred.');
    }
  }
);