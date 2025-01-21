import { createSlice } from '@reduxjs/toolkit';
import { fetchAirtimeResponse } from '../redux/fetchData'

interface AirtimeResponse {
  id: string;
  amount: number;
  status: string;
  [key: string]: string | number;
  
} 


interface AirtimeState {
    loading: boolean;
    successMessage: string | null;
    errorMessage: string | null;
    airtimeResponse: AirtimeResponse[];
  }

  const initialState: AirtimeState = {
    loading: false,
    successMessage: null,
    errorMessage: null,
    airtimeResponse: [],
  };

  const airtimeSlice = createSlice({
    name: 'airtime',
    initialState,
    reducers: {
      clearMessages: (state) => {
        state.successMessage = null;
        state.errorMessage = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAirtimeResponse.pending, (state) => {
          state.loading = true;
          state.errorMessage = null;
        })
        .addCase(fetchAirtimeResponse.fulfilled, (state, action) => {
          state.loading = false;
          state.airtimeResponse = action.payload;
          localStorage.setItem('airtimeResponse', JSON.stringify(action.payload));
        })
        .addCase(fetchAirtimeResponse.rejected, (state, action) => {
          state.loading = false;
          state.errorMessage = action.payload as string;
        });
    },
  });
  
  export const { clearMessages } = airtimeSlice.actions;
  export default airtimeSlice.reducer;