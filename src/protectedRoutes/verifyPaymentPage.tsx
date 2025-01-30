import React, { useCallback } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { verifyPayment } from '../redux/paymentSlice';

const PaymentVerification: React.FC = () => {
  const dispatch = useAppDispatch();
  
  
  const { loading, error, verifyStatus, amount, phoneNumber, transactionId } = useAppSelector(
    (state) => state.payment
  );

  
  const handleVerifyPayment = useCallback(() => {
    if (!transactionId || !amount || !phoneNumber) {
      console.log('Transaction ID, amount, and phone number are required');
      return;
    }
    dispatch(verifyPayment({ transactionId, amount, phoneNumber }));
  }, [transactionId, amount, phoneNumber]);

  return (
    <section className="w-[100%]">
      <h1>Verify Payment</h1>
      <h3>{transactionId || 'No Transaction ID available'}</h3>
      {loading && <p>Verifying payment...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      <form className="grid grid-cols-4 items-center gap-4 max-md:ml-[.9em] mx-auto max-md:gap-[.4em] border-[.2em] border-solid w-[90%] max-md:w-[90%] p-6 max-md:p-[.4em]">
        {/* ✅ Transaction ID Field */}
        <label className="flex flex-col col-span-2 max-md:text-[.8em] gap-2 text-[1rem]">
          <input
            type="text"
            className="w-full rounded-[.1em] p-[.2em] max-md:p-[.1em] border-[.2em]"
            value={transactionId || ''}
            readOnly
            placeholder="Transaction ID will appear here"
          />
        </label>
        
  
        <label className="flex flex-col col-span-2 max-md:text-[.8em] gap-2 text-[1rem]">
          Amount
          <input
            className="w-full rounded-[.1em] p-[.2em] max-md:p-[.1em] border-[.2em]"
            type="number"
            value={amount ?? 0}
            readOnly
            placeholder="Amount will appear here"
          />
        </label>

       
        <label className="flex flex-col col-span-2 max-md:text-[.8em] max-md:gap-[.4em] gap-2 text-[1rem]">
          Phone Number
          <input
            className="w-3/4 rounded-[.1em] max-md:p-1 p-[.2em] border-[.2em]"
            type="text"
            value={phoneNumber || ''}
            readOnly
            placeholder="Phone Number will appear here"
          />
        </label>
      
       
        {verifyStatus && <p className="text-green-600">Verification Status: {verifyStatus}</p>}

       
        <button
          type="button"
          className="col-span-2 bg-[#c8a7ff] text-white max-[600px]:w-[50%] max-[550px]:w-[60%] max-w-[50%] font-bold max-md:text-md text-lg rounded-[.2em] mx-auto"
          onClick={handleVerifyPayment}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify Payment'}
        </button>
      </form>
    </section>
  );
};

export default PaymentVerification;
