import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLoggedInUser } from './fetchData';
import { FetchUserResponse } from './fetchData';

interface User {
  _id: string | null;
  username: string | null;
  email: string | null;
  phoneNumber: string | null;
  country: string | null;
}

interface UserState extends User {
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  _id: null,
  username: null,
  email: null,
  phoneNumber: null,
  country: null,
  loading: false,
  error: null,
};

const loggedInUserSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action: PayloadAction<FetchUserResponse>) => {
        state.loading = false;
        state.error = null;
        state._id = action.payload._id;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.phoneNumber = action.payload.phoneNumber;
        state.country = action.payload.country;
      })
      .addCase(fetchLoggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to fetch user';
        console.error('Error fetching user:', action.payload); // Optional debugging
      });
  },
});

// Export the reducer and actions
export const userProfileReducer = loggedInUserSlice.reducer;
export const { clearError } = loggedInUserSlice.actions;
