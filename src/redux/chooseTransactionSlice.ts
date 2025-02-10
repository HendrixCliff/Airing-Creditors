import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface TransactionState {
  transactionId: string | null;
  amount: number | null;
  status: "pending" | "successful" | "refunded" | "failed" | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}
// Define allowed status values
type TransactionStatus = "pending" | "successful" | "refunded" | "failed" | null;
// Define the expected response type from the API
interface ChooseTransactionResponse {
  success: boolean;
  message: string;
  data?: {
    transactionId: string;
    status: TransactionStatus;
  };
}
// Define the payload type
interface ChooseTransactionPayload {
  transactionId: string | null;
  action: "airtime" | "refund";
  account_bank?: string;
  account_number?: string;
}

// Define the rejected value type
type RejectValue = string;

const initialState: TransactionState = {
  transactionId: null,
  amount: null,
  status: "pending",
  loading: false,
  error: null,
  successMessage: null,
};

export const chooseTransactionAction = createAsyncThunk<
  ChooseTransactionResponse, // Response type
  ChooseTransactionPayload, // Payload type
  { rejectValue: RejectValue } // Reject value type
>(
  "transaction/chooseTransactionAction",
  async ({ transactionId, action, account_bank, account_number }, { rejectWithValue }) => {
    try {
      const response = await axios.post<ChooseTransactionResponse>("/api/v1/transaction/chooseTransactionAction", {
        transactionId,
        action,
        account_bank,
        account_number,
      });

      return response.data; // Return the structured response
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || "Failed to process transaction action");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
const chooseTransactionSlice = createSlice({
  name: "chooseTransaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(chooseTransactionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(
        chooseTransactionAction.fulfilled,
        (state, action: PayloadAction<ChooseTransactionResponse>) => {
          state.loading = false;
          state.status = action.payload.data?.status || null;
          state.successMessage = action.payload.message; // Store success message
        }
      )
      .addCase(chooseTransactionAction.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export default chooseTransactionSlice.reducer;

