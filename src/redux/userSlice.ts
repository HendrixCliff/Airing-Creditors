import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updatePassword } from './fetchData';



// export interface UpdateMePayload {
//   username?: string;
//   email?: string;
// }

interface UserState {
  loading: boolean;
  error: string | null;
  isUpdatingPassword: boolean;
  updatePasswordSuccess: boolean;
  updatePasswordError: string | null;
}

const initialState: UserState = {
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
