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
  identifier: string; // Ensure this matches LoginComponent
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


export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Ensure identifier is sent, not username
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk<AuthResponse, SignupPayload>(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:7000/api/v1/auth/signup`,
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
      const response = await axios.post(`http://localhost:7000/api/v1/auth/forgotPassword`, { email });
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
        ` http://localhost:7000/api/v1/auth/resetPassword/${payload.token}`,
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
        `http://localhost:7000/api/v1/users/userProfile`,
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
        `http://localhost:7000/api/v1/users/updatePassword`,
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