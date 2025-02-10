import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface TransactionState {
  transactionId: string | null;
  userId: string | null;
  amount: number | null;
  status: "pending" | "successful" | "failed" | null;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactionId: null,
  userId: null,
  amount: null,
  status: null,
  loading: false,
  error: null,
};

// ✅ Async thunk for handling webhook data (Polling method)
export const handleFlutterwaveWebhook = createAsyncThunk<
  any, // Response type
  any, // Payload type
  { rejectValue: string }
>("transaction/handleWebhook", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/webhook", payload); // Adjust API URL
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || "Failed to process webhook");
  }
});

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    // ✅ WebSocket updates (Real-time updates)
    updateTransaction: (state, action: PayloadAction<{ transactionId: string; userId: string; amount: number; status: "pending" | "successful" | "failed" }>) => {
      state.transactionId = action.payload.transactionId;
      state.userId = action.payload.userId;
      state.amount = action.payload.amount;
      state.status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleFlutterwaveWebhook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleFlutterwaveWebhook.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.transactionId = action.payload.transactionId;
        state.userId = action.payload.userId;
        state.amount = action.payload.amount;
        state.status = action.payload.status; // Webhook transactions start as "pending"
      })
      .addCase(handleFlutterwaveWebhook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

// ✅ Export the WebSocket update action
export const { updateTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
