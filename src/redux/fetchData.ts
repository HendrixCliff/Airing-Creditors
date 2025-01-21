import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { RootState } from './rootReducer';


 

interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordResponse {
  message: string;
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
  }
  
  interface AirtimeResponse {
    id: string;
    amount: number;
    status: string;
    [key: string]: string | number;
    
  }
  // interface User {
  //   id: string;
  //   name: string;
  //   email: string;
  //   phoneNumber: string;
  //   country: string;
  //   role: string;
  // }
  export interface FetchUserResponse {
    id: string;
    username: string;
    email: string;
    phoneNumber: number;
    country: string;
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
              { withCredentials: true }
            );
            
            return response.data as AuthResponse;
         }
         catch (error: unknown) {
          console.error('Login error:', error); 
    
          if (axios.isAxiosError(error)) {
            if (error.response) {
              return rejectWithValue(error.response.data.message || 'Login failed');
            } else {
              return rejectWithValue('No response from server');
            }
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


export const resetPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordPayload,
  { rejectValue: string }
>(
  'auth/resetPassword',
  async ({  password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:7000/api/v1/auth/resetPassword/:token`, { 
        password, 
        confirmPassword 
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to reset password');
      }
      return rejectWithValue('Failed to reset password');
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
export const fetchAirtimeResponse = createAsyncThunk<
  AirtimeResponse[], // Expected return type of the action
  void,              // Argument type (no arguments in this case)
  { rejectValue: string } // Type for the rejectWithValue
>(
  'airtime/fetchAirtimeResponse',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ data: AirtimeResponse[] }>(
        'http://localhost:7000/api/v1/airtime/airtimeResponse'
      );
      return response.data.data; // Return the array of AirtimeResponse objects
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch airtime response');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);



export const fetchLoggedInUser = createAsyncThunk<
  FetchUserResponse,        // The type of the resolved payload
  void,                     // The type of the argument (no argument here)
  { rejectValue: string, state: RootState }   // The type of the rejected payload
>(
  'auth/fetchLoggedInUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const { cookie } = state.auth;
      const response = await axios.get<FetchUserResponse>('http://localhost:7000/api/v1/user/userProfile', {
        headers: {
          Authorization: `Bearer ${cookie}`, 
        },
      });
      if (!response.data) {
        throw new Error('Failed to fetch user');
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch user');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);


export const updatePassword = createAsyncThunk<
  void,
  UpdatePasswordPayload,
  { rejectValue: string, state: RootState }
>(
  'auth/updatePassword',
  async ({  newPassword }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const { cookie } = state.auth;
      await axios.post('http://localhost:7000/api/v1/users/updatePassword', {
        cookie,
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

