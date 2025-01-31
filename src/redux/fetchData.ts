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



export interface FetchUserResponse {
  _id: string;
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
    const response = await axios.get(`https://ngrok.com/r/aep/api/v1/auth/protected`, {
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
        `https://ngrok.com/r/aep/api/v1/auth/login`, // Use environment variable
        { username, password }, // Request payload
        { withCredentials: true } // Enable credentials (cookies/sessions)
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
        `https://ngrok.com/r/aep/api/v1/auth/signup`,
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
      const response = await axios.post(`https://ngrok.com/r/aep/api/v1/auth/forgotPassword`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to request password reset');
    }
  }
);
//`${import.meta.env.VITE_API_BASE_URL
export const resetPassword = createAsyncThunk<ResetPasswordResponse, ResetPasswordPayload, { rejectValue: string }>(
  'auth/resetPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://ngrok.com/r/aep/api/v1/auth/resetPassword/${payload.token}`,
        { password: payload.password, confirmPassword: payload.confirmPassword },  
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
        `https://ngrok.com/r/aep/api/v1/users/userProfile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data) return rejectWithValue('User data is missing.');

      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user');
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
        `https://ngrok.com/r/aep/api/v1/users/updatePassword`,
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