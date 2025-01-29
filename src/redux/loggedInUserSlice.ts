import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLoggedInUser } from './fetchData';

interface User {
  _id: string | null;
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
  country: null,
  email: null,
  phoneNumber: null,
  username: null,
  loading: false,
  error: null,
  _id: null
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
      .addCase(fetchLoggedInUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.error = null; // Ensure error is null on success
        // Spread the payload to update the user state
        Object.assign(state, action.payload);
      })
      .addCase(fetchLoggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user'; // Assign error message
        console.error('Error fetching user:', action.payload); // Optional debugging
      });
  },
});

// Export the reducer and actions
export const userProfileReducer = loggedInUserSlice.reducer;
export const { clearError } = loggedInUserSlice.actions;
