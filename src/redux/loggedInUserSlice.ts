import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLoggedInUser } from './fetchData';

interface User {
  id: string | null;
  username: string | null;
  email: string | null;
  phoneNumber: number | null;
  country: string | null;
}

interface UserState extends User {
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  phoneNumber: null,
  country: null,
  loading: false,
  error: null,
};

const loggedInUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Example of a synchronous action (if needed)
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
      .addCase(fetchLoggedInUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.phoneNumber = action.payload.phoneNumber;
        state.country = action.payload.country;
      })
      .addCase(fetchLoggedInUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user';
      });
  },
});

export const userProfileReducer = loggedInUserSlice.reducer;
export const { clearError } = loggedInUserSlice.actions;
