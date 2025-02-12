import React, { useState } from "react";
import { useAppDispatch } from "./../hooks/useAppDispatch";
import { useAppSelector } from "./../hooks/useAppSelector";
import { initiatePayment } from "../redux/paymentSlice";

const PaymentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, status } = useAppSelector((state) => state.payment);
  const { token } = useAppSelector((state) => state.auth);

  // State to toggle form visibility
  const [showForm, setShowForm] = useState(false);

  interface PaymentDetails {
    email: string;
    amount: number;
    phone: string;
    phoneNumber: string;
    currency: string;
    payment_option: string;
    tx_ref: string;
    card_number: string;
    expiry_date: string;
    cvv: string;
    card_type?: string;
    countryCode: string;
  }

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    email: "",
    amount: 0,
    phone: "",
    phoneNumber: "",
    currency: "NGN",
    payment_option: "card",
    tx_ref: `txn_${new Date().getTime()}`,
    card_number: "",
    expiry_date: "",
    cvv: "",
    countryCode: "+234",
    card_type: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setPaymentDetails((prev) => {
      let updatedValue: string | number = value;

      if (name === "cvv") {
        updatedValue = value.replace(/\D/g, "").slice(0, 3); // Allow only 3 numeric digits
      }

      if (name === "amount") {
        updatedValue = value === "" ? "" : parseFloat(value) || 0;
      }

      const updatedDetails = { ...prev, [name]: updatedValue };

      if (name === "countryCode" || name === "phone") {
        updatedDetails.phone = updatedDetails.phone.replace(/^0+/, "");
        updatedDetails.phoneNumber = `${updatedDetails.countryCode}${updatedDetails.phone}`;
      }

      return updatedDetails;
    });
  };

  const handleInitiatePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!paymentDetails.email || !paymentDetails.amount || !paymentDetails.phoneNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const paymentPayload = {
        ...paymentDetails,
        amount: parseFloat(paymentDetails.amount.toString()) || 0,
      };

      await dispatch(initiatePayment(paymentPayload));
      console.log("Payment initiated successfully");
    } catch (err) {
      console.error("Payment initiation failed:", err);
    }
  };

  return (
    <section className="w-full flex flex-col items-center justify-center">
      {/* Toggle Form Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        {showForm ? "Hide Payment Form" : "Show Payment Form"}
      </button>

      {/* Form Container (Maintains Size Even When Hidden) */}
      <section
        className={`w-full max-w-[100%] mt-4 transition-opacity duration-500 ease-in-out ${
          showForm ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ height: "500px" }} // Set a fixed height to maintain space
      >
        {loading && <p>Processing payment...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <h2 className="text-center w-[90%] mx-[auto] bg-white text-xl font-semibold mb-[1em]">
          Initiate 💳 Payment 
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 bg-white gap-4 border-2 border-gray-300 w-full px-[.8em] rounded-md shadow-md"
          onSubmit={handleInitiatePayment}
        >
          {/* Email */}
          <label className="flex flex-col col-span-2">
            Email
            <input
              type="email"
              name="email"
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentDetails.email}
              onChange={handleChange}
              required
            />
          </label>

          {/* Amount */}
          <label className="flex flex-col col-span-2">
            Amount
            <input
              type="number"
              name="amount"
              className="border p-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={paymentDetails.amount}
              onChange={handleChange}
              required
            />
          </label>

          {/* Phone Number */}
          <label className="flex flex-col col-span-2">
            Phone Number (No Zero and Country Code)
            <input
              type="text"
              name="phone"
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentDetails.phone}
              onChange={handleChange}
              required
            />
          </label>

          {/* Card Number */}
          <label className="flex flex-col col-span-2">
            Card Number
            <input
              type="text"
              name="card_number"
              className="border p-2 w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentDetails.card_number}
              onChange={handleChange}
              required
            />
          </label>

          {/* Expiry Date */}
          <label className="flex flex-col col-span-2 md:col-span-1">
            Expiry Date
            <input
              type="text"
              className="border p-2 w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="expiry_date"
              value={paymentDetails.expiry_date}
              onChange={handleChange}
              required
            />
          </label>

          {/* CVV */}
          <label className="flex flex-col col-span-2 md:col-span-1">
            CVV
            <input
              className="border p-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              type="text"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleChange}
              required
              placeholder="123"
              pattern="\d{3}"
              title="Please enter exactly 3 numeric digits"
            />
          </label>

          {/* Submit Button */}
          {status && <h3 className="col-span-2 text-center text-blue-600">{status}</h3>}
          <button
            type="submit"
            disabled={!token || loading || !paymentDetails.email || !paymentDetails.amount || !paymentDetails.phone}
            className="col-span-2 bg-gray-400 w-[40%] text-white font-semibold py-2 rounded-md mb-[1em] transition duration-200 mx-auto hover:bg-blue-600 disabled:bg-purple-500"
          >
            {loading ? "Processing..." : "Initiate Payment"}
          </button>
        </form>
      </section>
    </section>
  );
};

export default PaymentPage;
