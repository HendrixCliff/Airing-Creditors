import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

interface User {
    username: string;
    email: string;
    phoneNumber: string;
    country: string;
  }


  interface UpdateMePayload {
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

  export  const updateMe = createAsyncThunk<UpdateMeResponse, UpdateMePayload, { rejectValue: string }>(
    'user/updateMe',
    async ({ userDetails }, { rejectWithValue, getState }) => {
      try {
        const state = getState() as RootState;
        const { token } = state.auth;
        const response = await axios.patch('http://localhost:7000/api/v1/users/updateMe', userDetails, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        return { user: response.data }; // Format response as UpdateMeResponse
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
          state.user = action.payload.user; // Update user details
          state.loading = false;
          state.error = null;
        })
        .addCase(updateMe.rejected, (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || 'Failed to update user details';
        });
    },
  });
  

  export const updateMeReducer = updateMeSlice.reducer;
  export default updateMeSlice.reducer;