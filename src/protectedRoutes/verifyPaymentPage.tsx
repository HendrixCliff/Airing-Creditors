import React, {useState} from 'react';
import { useAppDispatch} from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector'
import { verifyPayment } from '../redux/fetchData'; 


const PaymentVerification: React.FC = () => {
  const dispatch = useAppDispatch();
  const [transactionId, setTransactionId] = useState('');
  const { loading, error, verificationStatus } = useAppSelector(
    (state) => state.payment
  );

  const handleVerifyPayment = () => {
    if (transactionId) {
      dispatch(verifyPayment({ transactionId }));
    } else {
      // Handle the case where transactionId is not provided
      console.log('Transaction ID is required');
    }
  };

  return (
    <div>
      <h1>Verify Payment</h1>
      {loading && <p>Verifying payment...</p>}
      {error && <p>Error: {error}</p>}
      <input
        type="text"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
        placeholder="Enter transaction ID"
      />
      {verificationStatus && <p>Verification Status: {verificationStatus}</p>}
      <button onClick={handleVerifyPayment} disabled={loading}>
        Verify Payment
      </button>
    </div>
  );
};

export default PaymentVerification;
