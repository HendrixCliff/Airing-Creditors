import React, { useState } from "react";
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { createVirtualAccountThunk } from "../redux/transferPaymentSlice";

const VirtualAccount: React.FC = () => {
  const [phoneNumberVirtual, setPhoneNumberVirtual] = useState(
    {
       countryCode: '+234',
       phone: '',
       phoneNumber: '',
    });
  const dispatch = useAppDispatch();

  const { loading, virtualAccount, error } = useAppSelector(
    (state) => state.virtualAccount
  );

  const handleCreateAccount = () => {
    if (phoneNumberVirtual.phoneNumber.trim() === "") return;
    dispatch(createVirtualAccountThunk(phoneNumberVirtual.phoneNumber));
  };
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setPhoneNumberVirtual((prev) => {
        let updatedValue: string | number = value;

        const updatedDetails = { ...prev, [name]: updatedValue };
        if (name === 'countryCode' || name === 'phone') {
          updatedDetails.phone = updatedDetails.phone.replace(/^0+/, ''); // Remove leading zeros
          updatedDetails.phoneNumber = `${updatedDetails.countryCode}${updatedDetails.phone}`;
        }
        return updatedDetails;
    })
}
  return (
    <form className="bg-white shadow-md rounded-lg max-w-[500px]:w-full h-[21em] mx-[.1em] mt-[.9em] px-[1em] py-[2em] max-[500px]:px-[.5em] max-[500px]:py-[3em]">
  {/* Heading */}
  <h2 className="text-xl font-bold text-center w-full mb-4">
    Recharge Your Airtime Instantly with a Virtual Account
  </h2>

  {/* Subtext */}
  <h4 className="text-center text-gray-700 text-[1rem] max-[500px]:text-[.7rem]">
    Generate a virtual account, transfer funds to it, and enjoy seamless automatic recharges.
  </h4>

  {/* Phone Number Input */}
  <label className="flex flex-col w-full mt-4">
    <span className="text-sm font-medium">Phone Number (No Zero and Country Code)</span>
    <input
      type="text"
      name="phone"
      placeholder="Enter Recharge phone number"
      value={phoneNumberVirtual.phone}
      onChange={handleChange}
      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      required
    />
  </label>

  {/* Submit Button (Centered) */}
  <div className="flex justify-center">
    <button
      onClick={handleCreateAccount}
      disabled={loading}
      className={`w-[70%] max-[500px]:w-full mt-4 py-2 text-white font-semibold rounded-md transition ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {loading ? "Creating..." : "Create Account"}
    </button>
  </div>

  {/* Error Message */}
  {error && <p className="text-red-500 text-center mt-3">{error}</p>}

  {/* Virtual Account Details */}
  {virtualAccount && (
    <section className="mt-6 p-4 bg-green-100 rounded-md">
      <p className="font-semibold">Account ID: <span className="font-normal">{virtualAccount.id}</span></p>
      <p className="font-semibold">Account Number: <span className="font-normal">{virtualAccount.accountNumber}</span></p>
      <p className="font-semibold">Bank Name: <span className="font-normal">{virtualAccount.bankName}</span></p>
      <p className="font-semibold">Phone Number: <span className="font-normal">{virtualAccount.phoneNumber}</span></p>
      <p className="font-semibold">Created At: <span className="font-normal">{virtualAccount.createdAt}</span></p>
    </section>
  )}
</form>

  
  );
};

export default VirtualAccount;
