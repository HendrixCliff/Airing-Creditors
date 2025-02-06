import axios from "axios";

interface VirtualAccountPayload {
  phoneNumber: string;
}

export interface VirtualAccountResponse {
    id?: string;
    accNumber?: string;
    bank?: string;
    phone?: string;
    created?: string;
  }
  

export const createVirtualAccount = async (
  payload: VirtualAccountPayload
): Promise<VirtualAccountResponse> => {
  try {
    const response = await axios.post<VirtualAccountResponse>(
      "https://yourapi.com/virtual-account",
      payload
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      throw new Error(error.response?.data?.message || "Failed to create virtual account");
    } else {
      // Generic error handling
      throw new Error("An unexpected error occurred");
    }
  }
};
