import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateMe, updatePassword } from './fetchData';

interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
   
  } | null;
  loading: boolean;
  error: string | null;
  isUpdatingPassword: boolean;
  updatePasswordSuccess: boolean;
  updatePasswordError: string | null;
}
interface UpdateMeResponse {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
  

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isUpdatingPassword: false,
  updatePasswordSuccess: false,
  updatePasswordError: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      clearUpdatePasswordState(state) {
        state.isUpdatingPassword = false;
        state.updatePasswordSuccess = false;
        state.updatePasswordError = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateMe.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateMe.fulfilled, (state, action: PayloadAction<UpdateMeResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
        })
        .addCase(updateMe.rejected, (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || 'Failed to update user details';
        });
  
      builder
        .addCase(updatePassword.pending, (state) => {
          state.isUpdatingPassword = true;
          state.updatePasswordSuccess = false;
          state.updatePasswordError = null;
        })
        .addCase(updatePassword.fulfilled, (state) => {
          state.isUpdatingPassword = false;
          state.updatePasswordSuccess = true;
        })
        .addCase(updatePassword.rejected, (state, action: PayloadAction<string | undefined>) => {
          state.isUpdatingPassword = false;
          state.updatePasswordError = action.payload || 'Failed to update password';
        });
    },
  });
  

export const userReducer = userSlice.reducer;
export const { clearUpdatePasswordState } = userSlice.actions;