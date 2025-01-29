import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 import { login, signup, protectedData, forgotPassword, checkAuth, resetPassword } from './fetchData';

 interface AuthState {
  user: { name: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  errorMessage: string | null;
  protectedMessage: string | null;
  forgotPasswordMessage: string | null;
  isLoggedIn: boolean;
  username: string | null;
  cookie?: string | null; // Optional
}

interface AuthResponse {
  token: string;
  username: string;
  cookie?: string; // Optional
}
interface ResetPasswordResponse {
  message: string;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
  successMessage: null,
  errorMessage: null,
  protectedMessage: null,
  forgotPasswordMessage: null,
  isLoggedIn: false,
  user: null,
  username: null,
  cookie: null, // Include if you want to track the cookie explicitly
};


  
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false; 
      state.error = null; 
      state.successMessage = null; 
      state.errorMessage = null;
      state.protectedMessage = null;
      state.forgotPasswordMessage = null;
      state.isLoggedIn = false; 
      state.username = null; 
  
    },
    clearAuthMessages(state) {
      state.successMessage = null;
      state.errorMessage = null;
    },

   
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.token; 
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;  
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload && typeof action.payload === 'string'
          ? action.payload
          : 'Login failed';
    });

      builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.error = null;
        
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload && typeof action.payload === 'string'
            ? action.payload
            : 'Signup failed';
      });
      builder
      .addCase(protectedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(protectedData.fulfilled, (state, action) => {
        state.loading = false;
        state.protectedMessage = action.payload.message;
      })
      .addCase(protectedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });  
      builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotPasswordMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
        state.loading = false;
        state.forgotPasswordMessage = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
      builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<ResetPasswordResponse>) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        
      })
      .addCase(resetPassword.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.errorMessage = action.payload || 'Failed to reset password';
      });
  },
});

export const { logout,  clearAuthMessages } = authSlice.actions;
export default authSlice.reducer;