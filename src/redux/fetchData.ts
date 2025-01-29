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
  amount: number;
  phoneNumber: string
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
    transactionId: string;
    status: string;
    amount: number;
    phoneNumber: string;
    
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
    username: string;
    email: string;
    phoneNumber: number;
    country: string;
  }


export const protectedData = createAsyncThunk<
  ProtectedResponse, 
  void, 
  { rejectValue: string; state: RootState }
>('auth/fetchProtectedData', async (_, { rejectWithValue, getState }) => {
  const state = getState();
  const token = state.auth.token;

  try {
    const response = await axios.get( `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/protected`, {
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
             `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
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
        const response = await axios.post( `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/signup`, {
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
      const response = await axios.post( `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/resetPassword/:token`, { 
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
       `${import.meta.env.VITE_API_BASE_URL}/api/v1/payment/initiatePayment`,
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
      const response = await axios.get( `${import.meta.env.VITE_API_BASE_URL}/api/v1/payment/verifyPayment`, {
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
  'airtime/airtimeResonse',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ data: AirtimeResponse[] }>(
         `${import.meta.env.VITE_API_BASE_URL}/api/v1/airtime/airtimeResponse`
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
  FetchUserResponse, 
  void,              
  { rejectValue: string; state: RootState } // Additional options
>(
  "userProfile/fetchLoggedInUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Extract the token from the state
      const token = (getState() as RootState).auth.token;
      if (!token) {
        throw new Error('Authentication token not found');
      }
      // Make the API request with the Authorization header
      const response = await axios.get<FetchUserResponse>(
         `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/userProfile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data) {
        throw new Error('Failed to fetch user data');
      }
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
      }
      console.error('Unexpected error:', error);
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
      await axios.post( `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/updatePassword`, {
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

