import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createVirtualAccount } from "../redux/fetchCreateVirtualAccount";
import type { VirtualAccountResponse } from "../redux/fetchCreateVirtualAccount";
interface VirtualAccount {
    id: string;
    accountNumber: string;
    bankName: string;
    phoneNumber: string;
    createdAt: string;
  }
  
  
  interface VirtualAccountState {
    loading: boolean;
    virtualAccount: VirtualAccount | null;
    error: string | null;
  }
  
// Initial state
const initialState: VirtualAccountState = {
  loading: false,
  virtualAccount: null,
  error: null,
};

export const createVirtualAccountThunk = createAsyncThunk<
  VirtualAccount, // Expected return type
  string, // Argument type
  { rejectValue: string } // Rejection payload type
>(
  "virtualAccount/create",
  async (phoneNumber, { rejectWithValue }) => {
    try {
      const response: VirtualAccountResponse = await createVirtualAccount({ phoneNumber });

      // Transform response to match VirtualAccount type
      const formattedResponse: VirtualAccount = {
        id: response.id || "", // Provide default values if needed
        accountNumber: response.accNumber || "",
        bankName: response.bank || "",
        phoneNumber: response.phone || "",
        createdAt: response.created || "",
      };

      return formattedResponse;
    } catch (error: unknown) { // Use 'unknown' instead of 'any'
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);




// Slice
const virtualAccountSlice = createSlice({
  name: "virtualAccount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createVirtualAccountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVirtualAccountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.virtualAccount = action.payload;
        state.error = null;
      })
      .addCase(createVirtualAccountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default virtualAccountSlice.reducer;
