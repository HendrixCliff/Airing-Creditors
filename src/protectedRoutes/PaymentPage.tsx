import React, { useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { initiatePayment } from '../redux/paymentSlice';

const PaymentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, status } = useAppSelector((state) => state.payment);
  const { isLoggedIn, token } = useAppSelector((state) => state.auth); // ✅ Added `token`

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
    email: '',
    amount: 0,
    phone: '',
    phoneNumber: '',
    currency: 'NGN',
    payment_option: 'card',
    tx_ref: `txn_${new Date().getTime()}`,
    card_number: '',
    expiry_date: '',
    cvv: '',
    countryCode: '+234',
    card_type: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  setPaymentDetails((prev) => {
    let updatedValue: string | number = value;

    // Limit CVV input to only three numeric characters
    if (name === 'cvv') {
      updatedValue = value.replace(/\D/g, '').slice(0, 3); // Remove non-numeric chars & limit to 3 digits
    }

    // Convert amount to number
    if (name === 'amount') {
      updatedValue = value === '' ? '' : parseFloat(value) || 0;
    }

    const updatedDetails = { ...prev, [name]: updatedValue };

    // Handle phone number updates dynamically
    if (name === 'countryCode' || name === 'phone') {
      updatedDetails.phone = updatedDetails.phone.replace(/^0+/, ''); // Remove leading zeros
      updatedDetails.phoneNumber = `${updatedDetails.countryCode}${updatedDetails.phone}`;
    }

    return updatedDetails;
  });
};



  // ✅ Validate Expiry Date
  const validateExpiryDate = (expiryDate: string) => {
    const [month, year] = expiryDate.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    return month && year && month >= 1 && month <= 12 && (year > currentYear || (year === currentYear && month >= currentMonth));
  };

  const handleExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    const formattedInput = input.length > 2 ? `${input.slice(0, 2)}/${input.slice(2, 4)}` : input;
    
    if (formattedInput.length <= 5) {
      setPaymentDetails((prev) => ({ ...prev, expiry_date: formattedInput }));
    }
  };

  const detectCardType = (cardNumber: string) => {
    if (/^4/.test(cardNumber)) return 'Visa';
    if (/^5[1-5]/.test(cardNumber)) return 'Mastercard';
    if (/^506[0-9]|^507[0-9]|^650[0-9]/.test(cardNumber)) return 'Verve';
    if (/^3[47]/.test(cardNumber)) return 'American Express';
    if (/^6(?:011|5)/.test(cardNumber)) return 'Discover';
    return 'Unknown';
  };

  const handleCardDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    
    if (input.length <= 16) { // ✅ Ensure card number is at most 16 digits
      setPaymentDetails((prev) => ({
        ...prev,
        card_number: input,
        card_type: detectCardType(input),
      }));
    }
  };

  // ✅ Handle Payment Submission with Validations
  const handleInitiatePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Validate Required Fields
    if (!paymentDetails.email || !paymentDetails.amount || !paymentDetails.phoneNumber) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!validateExpiryDate(paymentDetails.expiry_date)) {
      alert('Invalid expiry date. Please enter a valid MM/YY.');
      return;
    }

    try {
      const paymentPayload = {
        ...paymentDetails,
        amount: parseFloat(paymentDetails.amount.toString()) || 0, // ✅ Ensure amount is a number
      };

      await dispatch(initiatePayment(paymentPayload));
      console.log('Payment initiated successfully');
    } catch (err) {
      console.error('Payment initiation failed:', err);
    }
  };

 return (
  <section className="w-full flex justify-center">
    {!isLoggedIn ? (
      <section className="w-full max-w-lg">
        {loading && <p>Processing payment...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <h2 className="text-center text-xl font-semibold mb-4">Payment Page</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 border-gray-300 w-full p-6 rounded-md shadow-md"
          onSubmit={handleInitiatePayment}
        >
          {/* Email */}
          <label className="flex flex-col col-span-2">
            Email
            <input
              type="email"
              name="email"
              value={paymentDetails.email}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full"
            />
          </label>

          {/* Amount */}
          <label className="flex flex-col col-span-2">
            Amount
            <input
              type="number"
              name="amount"
              value={paymentDetails.amount}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full"
            />
          </label>

          {/* Phone Number */}
          <label className="flex flex-col col-span-2">
            Phone Number (No Zero)
            <input
              type="text"
              name="phone"
              value={paymentDetails.phone}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full"
            />
          </label>

          {/* Card Number */}
          <label className="flex flex-col col-span-2">
            Card Number
            <input
              type="text"
              name="card_number"
              value={paymentDetails.card_number}
              onChange={handleCardDetails}
              required
              className="border p-2 rounded-md w-full"
            />
          </label>

          {/* Expiry Date */}
          <label className="flex flex-col col-span-2 md:col-span-1">
            Expiry Date
            <input
              type="text"
              name="expiry_date"
              value={paymentDetails.expiry_date}
              onChange={handleExpiryDate}
              required
              className="border p-2 rounded-md w-full"
            />
          </label>

          {/* CVV */}
          <label className="flex flex-col col-span-2 md:col-span-1">
            CVV
            <input
              className="border p-2 rounded-md w-full"
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
            className="col-span-2 bg-gray-400 w-[40%] text-white font-semibold py-2 rounded-md  transition duration-200 mx-auto  hover:bg-blue-600  disabled:bg-purple-500"
          >
            {loading ? "Processing..." : "Initiate Payment"}
          </button>
        </form>
      </section>
    ) : (
      <p className="text-center text-lg">Please log in to proceed with payment.</p>
    )}
  </section>
);

};

export default PaymentPage;
