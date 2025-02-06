import React, { useState } from "react";
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { createVirtualAccountThunk } from "../redux/transferPaymentSlice";

const VirtualAccount: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useAppDispatch();

  const { loading, virtualAccount, error } = useAppSelector(
    (state) => state.virtualAccount
  );

  const handleCreateAccount = () => {
    if (phoneNumber.trim() === "") return;
    dispatch(createVirtualAccountThunk(phoneNumber));
  };

  return (
    <section className="max-w-md mx-auto mt-[1em] p-[3em] bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">Create Virtual Account</h2>

      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleCreateAccount}
        disabled={loading}
        className={`w-full mt-4 py-2 text-white font-semibold rounded-md transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      {error && <p className="text-red-500 text-center mt-3">{error}</p>}

      {virtualAccount && (
        <section className="mt-6 p-4 bg-green-100 rounded-md">
          <p className="font-semibold">Account ID: <span className="font-normal">{virtualAccount.id}</span></p>
          <p className="font-semibold">Account Number: <span className="font-normal">{virtualAccount.accountNumber}</span></p>
          <p className="font-semibold">Bank Name: <span className="font-normal">{virtualAccount.bankName}</span></p>
          <p className="font-semibold">Phone Number: <span className="font-normal">{virtualAccount.phoneNumber}</span></p>
          <p className="font-semibold">Created At: <span className="font-normal">{virtualAccount.createdAt}</span></p>
        </section>
      )}
    </section>
  );
};

export default VirtualAccount;
