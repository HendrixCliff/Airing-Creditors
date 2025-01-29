import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { verifyPayment } from '../redux/fetchData';



const PaymentVerification: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, verifyStatus, amount,phoneNumber, transactionId } = useAppSelector(
    (state) => state.payment
  );
  
  const handleVerifyPayment = () => {
    if (transactionId) {
      dispatch(verifyPayment({ transactionId }));
    } else {
      console.log('Transaction ID is required');
    }
  };

  return (
    <section className=" w-[100%]">
      <h1>Verify Payment</h1>
      <h3>{transactionId || 'No Transaction ID available'}</h3>
      {loading && <p>Verifying payment...</p>}
      {error && <p>Error: {error}</p>}
      <form className="grid grid-cols-4 items-center gap-4 max-md:ml-[.9em] mx-[auto] max-md:gap-[.4em] border-[.2em] border-solid w-[90%] max-md:w-[90%] p-6 max-md:p-[.4em]">
      <label className="flex flex-col col-span-2 max-md:text-[.8em]  gap-2 text-[1rem]  col-span-2 md:col-span-1">
        <input
          type="text"
           className="w-full rounded-[.1em] p-[.2em] max-md:p-[.1em] border-[.2em]"
          value={transactionId || ''}
          readOnly
          placeholder="Transaction ID will appear here"
        />
     </label>
     
      <label className="flex flex-col col-span-2 max-md:text-[.8em]  gap-2 text-[1rem]  col-span-2 md:col-span-1">
          Amount
          <input
            className="w-full rounded-[.1em] p-[.2em] max-md:p-[.1em] border-[.2em]"
            type="number"
            value={amount || ''}
            readOnly
             placeholder="Amount will appear here"
          />
        </label>
        <label className="flex flex-col col-span-2 max-md:text-[.8em] max-md:gap-[.4em] gap-2 text-[1rem]  col-span-2">
          Phone Number
        <input
          className="w-3/4 rounded-[.1em] max-md:p-1 p-[.2em] border-[.2em]"
          type="text"
          value={phoneNumber || ''}
          readOnly
           placeholder="Phone Number will appear here"
        />
        </label>
      
      {verifyStatus && <p>Verification Status: {verifyStatus}</p>}
      <button onClick={handleVerifyPayment} disabled={loading}>
        Verify Payment
      </button>
      </form>
 </section>
  );
};

export default PaymentVerification;
