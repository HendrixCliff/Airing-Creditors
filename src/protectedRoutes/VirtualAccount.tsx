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
    <form className="max-[500px]:max-w-[100%] h-[21em] mx-[.1em] mt-[.9em] max-[500px]:px-[.5em] max-[500px]:py-[3em] bg-white shadow-md rounded-lg">
<h2 className="text-xl font-bold w-full text-center mb-4">Recharge Your Airtime Instantly with a Virtual Account</h2>
<h4 className="text-center w-[100%] max-[500px]:text-[.7rem] text-[1rem] text-gray-700">
  Generate a virtual account, transfer funds to it, and enjoy seamless automatic recharges.
</h4>
    <label className="flex flex-col max-[500px]:w-[100%] col-span-2">
      Phone Number  (No Zero and Country Code)
      <input
        type="text"
        name="phone"
        placeholder="Enter Recharge phone number"
        value={phoneNumberVirtual.phone}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
         required
      />
     </label>
      <button
        onClick={handleCreateAccount}
        disabled={loading}
        className={`max-[500px]:w-[100%] w-[70%] ml-[auto] mt-4 py-2 text-white font-semibold rounded-md transition ${
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
    </form>
  );
};

export default VirtualAccount;
