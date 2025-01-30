import React, { useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { initiatePayment } from '../redux/paymentSlice'; // Ensure correct import
import { RootState } from '../redux/rootReducer'; // Import RootState for type safety

const PaymentPage: React.FC = () => {
  const dispatch = useAppDispatch();

  // ✅ Explicitly define the type of `state`
  const { loading, error, status } = useAppSelector((state: RootState) => state.payment);
  const { isLoggedIn } = useAppSelector((state: RootState) => state.auth);
  
  interface PaymentDetails {
    email: string;
    amount: number | string;
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
    [key: string]: string | number | undefined;
  }
  
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    email: '',
    amount: 0,
    phone: '',
    phoneNumber: '+234',
    currency: 'NGN',
    payment_option: 'card',
    tx_ref: `txn_${new Date().getTime()}`,
    card_number: '',
    expiry_date: '',
    cvv: '',
    countryCode: '+234',
    card_type: '',
  });

  // ✅ Handle input changes dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value, // Convert amount to number
    }));

    if (name === 'countryCode' || name === 'phone') {
      setPaymentDetails((prev) => ({
        ...prev,
        phoneNumber: `${prev.countryCode}${prev.phone}`,
      }));
    }
  };

  const handleInitiatePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!paymentDetails.email || !paymentDetails.amount || !paymentDetails.phoneNumber) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const paymentPayload = {
        ...paymentDetails,
        amount: parseFloat(paymentDetails.amount.toString()) || 0, // Ensure amount is a number
      };

      await dispatch(initiatePayment(paymentPayload));
      console.log('Payment initiated successfully');
    } catch (err) {
      console.error('Payment initiation failed:', err);
    }
  };

  return (
    <section className="w-full">
      {isLoggedIn ? (
        <section className="w-full">
          {loading && <p>Processing payment...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}

          <h2 className="text-center mb-4">Payment Page</h2>
          <form onSubmit={handleInitiatePayment}>
            <input
              type="email"
              name="email"
              value={paymentDetails.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
            <input
              type="number"
              name="amount"
              value={paymentDetails.amount}
              onChange={handleChange}
              required
              placeholder="Amount"
            />
            <input
              type="text"
              name="phone"
              value={paymentDetails.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
            />
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Initiate Payment"}
            </button>
          </form>
          {status && <p>Initiation Status: {status}</p>}
        </section>
      ) : (
        <p>Please log in to proceed with payment.</p>
      )}
    </section>
  );
};

export default PaymentPage;
