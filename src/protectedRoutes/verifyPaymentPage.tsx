import React from 'react';
import { useAppDispatch} from '../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector'
import { verifyPayment } from '../redux/fetchData'; 
const PaymentVerification: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, verificationStatus } = useAppSelector(
    (state) => state.payment
  );

  const handleVerification = async () => {
    try {
      const payload = { transactionId: 'your-payment-id' }; // Replace with actual payment ID
      const result = await dispatch(verifyPayment(payload)).unwrap();
      console.log('Verification successful:', result);
    } catch (err) {
      console.error('Verification failed:', err);
    }
  };

  return (
    <div>
      <h1>Verify Payment</h1>
      {loading && <p>Verifying payment...</p>}
      {error && <p>Error: {error}</p>}
      {verificationStatus && <p>Verification Status: {verificationStatus}</p>}
      <button onClick={handleVerification} disabled={loading}>
        Verify Payment
      </button>
    </div>
  );
};

export default PaymentVerification;
