import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { RootState } from './rootReducer';

interface UpdateMeResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    
  };
}

interface UpdateMePayload {
  token: string;
  userDetails: {
    name?: string;
    email?: string;
  
  };
}

interface VerifyPaymentPayload {
  transactionId: string;
}

export interface VerifyPaymentResponse {
  status: string;
 
}

export interface UpdatePasswordPayload {
    token: string;
    newPassword: string; 
  }
  

  export interface UpdatePasswordResponse {
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


interface ProtectedResponse {
  data: string;
}

interface ForgotPasswordPayload {
    email: string;
}

interface ForgotPasswordResponse {
    message: string;
}

export interface PaymentResponse {
    paymentId: string;
    status: string;
    amount: number;
}
  
  interface PaymentPayload {
    amount: number;
    recipientId: string;
  }
  
  export const checkAuth = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:7000/api/v1/auth/me', { withCredentials: true });
      return response.data; // e.g., { username: 'user123' }
    } catch (error) {
      console.log(error)
      return rejectWithValue('Not authenticated')
    }
  });

export const protectedData = createAsyncThunk<
  ProtectedResponse, 
  void, 
  { rejectValue: string; state: RootState }
>('auth/fetchProtectedData', async (_, { rejectWithValue, getState }) => {
  const state = getState();
  const token = state.auth.token;

  try {
    const response = await axios.get('http://localhost:7000/api/v1/auth/protected', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || 'Access denied');
    }
    return rejectWithValue('Access denied');
  }
});
  
export const login = createAsyncThunk<AuthResponse, LoginPayload> (
    'auth/login', 
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
              'http://localhost:7000/api/v1/auth/login',
              { username, password },
              { withCredentials: true } // Ensures cookies are sent with the request
            );
            
            return { username, token: response.data.token };
         }
         catch (error: unknown) {
          console.error('Login error:', error); // Debugging
          if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data.message || 'Login failed');
          }
          return rejectWithValue('Login failed');
        }
        
    }
)





export const signup = createAsyncThunk<AuthResponse, SignupPayload>(
    'auth/signup',
    async ({ username, email, password, confirmPassword, phoneNumber, country }, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:7000/api/v1/auth/signup', {
          username,
          email,
          password,
          confirmPassword,
          phoneNumber,
          country
        });
        return { username: response.data.username, token: response.data.token };
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          return rejectWithValue(error.response.data.message || 'Signup failed');
        }
        return rejectWithValue('Signup failed');
      }
    }
  );

export const forgotPassword = createAsyncThunk<ForgotPasswordResponse, ForgotPasswordPayload>(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:7000/api/v1/auth/forgotPassword', { email });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to request password reset');
      }
      return rejectWithValue('Failed to request password reset');
    }
  }
);

export const initiatePayment = createAsyncThunk<
  PaymentResponse,
  PaymentPayload, 
  { rejectValue: string; state: RootState }
>('payment/initiatePayment', async (payload, { rejectWithValue, getState }) => {
  const state = getState();
  const token = state.auth.token;

  try {
    const response = await axios.post(
      'http://localhost:7000/api/v1/payment/initiatePayment',
      payload, // Payload contains the required payment information
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || 'Payment initiation failed');
    }
    return rejectWithValue('Payment initiation failed');
  }
});


export const verifyPayment = createAsyncThunk<
  VerifyPaymentResponse,
  VerifyPaymentPayload,
  { rejectValue: string; state: RootState }
>(
  'payment/verifyPayment',
  async (payload, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.auth.token;

    try {
      const response = await axios.get('http://localhost:7000/api/v1/payment/verifyPayment', {
        headers: { Authorization: `Bearer ${token}` },
        params: payload,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || 'Payment verification failed'
        );
      }
      return rejectWithValue('Payment verification failed');
    }
  }
);

export const updateMe = createAsyncThunk<
  UpdateMeResponse,
  UpdateMePayload,
  { rejectValue: string }
>(
  'auth/updateMe',
  async ({ token, userDetails }, { rejectWithValue }) => {
    try {
      const response = await axios.patch('http://localhost:7000/api/v1/users/updateMe', userDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to update user details');
      }
      return rejectWithValue('Failed to update user details');
    }
  }
);

export const updatePassword = createAsyncThunk<
  void,
  UpdatePasswordPayload,
  { rejectValue: string }
>(
  'auth/updatePassword',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      await axios.post('http://localhost:7000/api/v1/users/updatePassword', {
        token,
        newPassword,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to update password');
      }
      return rejectWithValue('Failed to update password');
    }
  }
);

