import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 import { login, signup, protectedData, forgotPassword, checkAuth } from './fetchData';

 interface AuthState {
  user: { name: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
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

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
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
      state.username = null;
      state.token = null;
    },
   
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      const { token, username, cookie } = action.payload;
      state.token = token;
      state.username = username;
      state.cookie = cookie || null; // Optional
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
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.isLoggedIn = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.username = null;
        state.isLoggedIn = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;