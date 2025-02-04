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
  }, [dispatch,transactionId, amount, phoneNumber]);

  return (
    <section className="w-full  flex justify-center">
      <section className="w-full  max-w-lg p-6">
        <h1 className="text-xl font-semibold mb-[.7em] bg-[white] ml-[auto] mr-[auto] w-[60%] text-center">Verify Payment</h1>
        <h3 className="text-center bg-[white] ml-[auto] mr-[auto] w-[60%] text-gray-700">
          { transactionId ? 'Transaction in progress' : 'No Transaction available'}
        </h3>
        
        {loading && <p className="text-center bg-[white] text-blue-500">Verifying payment...</p>}
        {error && <p className="text-bg-[white]  text-red-500">Error: {error}</p>}
        
        <form className="grid grid-cols-1 bg-[white] md:grid-cols-2 gap-4 border-2 border-gray-300 w-full p-6 rounded-md shadow-md">
          
          <label className="flex flex-col col-span-2">
            Transaction ID
            <input
              type="text"
              className="w-full bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[1em] max-[500px]:text-[.7em]  p-2 border border-gray-300"
              value={transactionId || ''}
              readOnly
              placeholder="Transaction ID will appear here"
            />
          </label>
          
          {/* Amount Field */}
          <label className="flex flex-col col-span-2 md:col-span-1">
            Amount
            <input
              className="w-full bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  p-2 border border-gray-300"
              type="number"
              value={amount ?? 0} 
              readOnly
              placeholder="Amount will appear here"
            />
          </label>
  
          {/* Phone Number Field */}
          <label className="flex flex-col col-span-2 md:col-span-1">
            Phone Number
            <input
              className="w-full bg-gray-100 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2 text-[1rem] max-[500px]:text-[.7em]   border-gray-300"
              type="text"
              value={phoneNumber || ''}
              readOnly
              placeholder="Phone Number will appear here"
            />
          </label>
        
          {/* Verification Status */}
          {verifyStatus && (
            <p className="col-span-2 text-center text-green-600 font-semibold">
              Verification Status: {verifyStatus}
            </p>
          )}
  
          {/* Verify Button */}
          <button
            type="button"
            className="col-span-2 bg-purple-500 text-white max-[500px]:w-[100%] font-semibold py-2 w-[40%] rounded-md hover:bg-purple-600 transition duration-200 mx-auto"
            onClick={handleVerifyPayment}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Payment'}
          </button>
        </form>
      </section>
    </section>
  );  
};

export default PaymentVerification;
