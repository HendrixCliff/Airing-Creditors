import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './rootReducer';

interface User {
  username: string;
  email: string;
  phoneNumber: string;
  country: string;
}

export interface UpdateMePayload {
  userDetails: {
    username: string;
    email: string;
    phoneNumber: string;
    country: string;
  };
}

export interface UpdateMeResponse {
  user: User;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const updateMe = createAsyncThunk<
  UpdateMeResponse,
  UpdateMePayload,
  { rejectValue: string; state: RootState } // ✅ Ensure `state` type is included
>(
  'user/updateMe',
  async ({ userDetails }, { rejectWithValue, getState }) => {
    try {
      const state = getState(); // ✅ Ensure `state` contains `auth`
      const token = state.auth?.token;

      if (!token) {
        return rejectWithValue('User is not authenticated');
      }

      const response = await axios.patch(
        'https://8fa0-105-112-176-62.ngrok-free.app/api/v1/users/updateMe',
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.user; // ✅ Ensure API response matches `UpdateMeResponse`
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to update user details');
      }
      return rejectWithValue('Failed to update user details');
    }
  }
);

const updateMeSlice = createSlice({
  name: 'updateMe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMe.fulfilled, (state, action: PayloadAction<UpdateMeResponse>) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to update user details';
      });
  },
});

export default updateMeSlice.reducer;
