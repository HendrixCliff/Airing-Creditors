import React, {useState} from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { initiatePayment, verifyPayment } from '../redux/fetchData';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { loading, error } = useAppSelector((state) => state.payment);
 
  const [paymentDetails, setPaymentDetails] = useState({
    email: '',
    amount: 0,
    phone: '',
    currency: 'NGN',
    tx_ref: `txn_${new Date().getTime()}`, // Generate a unique transaction reference
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };
  const handleInitiatePayment = async () => {
    try {
      const paymentPayload = { amount: 100, recipientId: 'recipient123' }; // Example payload
      const result = await dispatch(initiatePayment(paymentPayload)).unwrap();
      console.log('Payment initiated successfully:', result);
    } catch (err) {
      console.error('Payment initiation failed:', err);
    }
  };

  const handleVerifyPayment = async () => {
    try {
      const verificationPayload = { transactionId: 'txn12345' }; // Example payload
      const result = await dispatch(verifyPayment(verificationPayload)).unwrap();
      console.log('Payment verified successfully:', result);
    } catch (err) {
      console.error('Payment verification failed:', err);
    }
  };

  return (
      <div>
      <div className="payment-section">
        <h2>Payment</h2>
        {loading && <p>Processing payment...</p>}
        {error && <p>Error: {error}</p>}

        <div className="payment-form">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={paymentDetails.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={paymentDetails.amount}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phone"
              value={paymentDetails.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Currency:
            <select
              name="currency"
              value={paymentDetails.currency}
              onChange={handleChange}
              required
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="NGN">NGN</option>
              {/* Add more currencies as needed */}
            </select>
          </label>
        </div>

        <button onClick={handleInitiatePayment} disabled={!token || loading}>
          Initiate Payment
        </button>
        <button onClick={handleVerifyPayment} disabled={!token || loading}>
          Verify Payment
        </button>
      </div>
    </div>
  );
};

export default Profile;
