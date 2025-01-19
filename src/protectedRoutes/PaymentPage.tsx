import React, { useState, useEffect } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { initiatePayment } from '../redux/fetchData';


const PaymentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.payment);
  const { isLoggedIn,  token } = useAppSelector((state) => state.auth);
  // git remote add origin https://github.com/HendrixCliff/Airing-Creditor-Backend
//git push -u origin master

  useEffect(() => {
    if (!isLoggedIn) {
      // Optionally redirect to login page or show a prompt for guests
      alert('You need to be logged in to make a payment.');

    }
  }, [isLoggedIn]);


  const [paymentDetails, setPaymentDetails] = useState({
    email: '',
    amount: 0,
    phone: '',
    currency: 'NGN',
    payment_option: 'card',
    tx_ref: `txn_${new Date().getTime()}`,
    card_number: '',
    expiry_date: '',
    cvv: ''
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  // Handle initiating payment
  const handleInitiatePayment = async () => {
    try {
      const paymentPayload = {
        ...paymentDetails,
        payment_option: 'card', // Explicitly specify card payment option
      };
  
      // Remove recipientId validation for card payments
      const result = await dispatch(initiatePayment(paymentPayload)).unwrap();
      console.log('Payment initiated successfully:', result);
    } catch (err) {
      console.error('Payment initiation failed:', err);
    }
  };
  

  return (
    <div>
      <h2>Payment Page</h2>
      {!isLoggedIn ? (
        <section className="payment-form">
          {loading && <p>Processing payment...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          {/* Payment Form */}
         <form className="flex border-[.2em] border-solid ">
          <section>
          <label>
            Email:
            <input
              className="w-[60%] max-md:w-[90%] rounded-[.1em] p-[.3em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
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
              className="w-[60%] max-md:w-[90%] rounded-[.1em] p-[.3em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
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
              className="w-[60%] max-md:w-[90%] rounded-[.1em] p-[.3em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
              type="text"
              name="phone"
              value={paymentDetails.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Currency:
            <select name="currency" value={paymentDetails.currency} onChange={handleChange} required>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="NGN">NGN</option>
            </select>
          </label>
          <label>
            Payment Option:
            <select name="payment_option" value={paymentDetails.payment_option} onChange={handleChange} required>
              <option value="card">Card</option>
              <option value="mobilemoneyghana">Mobile Money (Ghana)</option>
              <option value="ussd">USSD</option>
            </select>
          </label>
          </section>
          {/* Card Payment Details */}
          {paymentDetails.payment_option === 'card' && (
            <section>
              <label>
                Card Number:
                <input
                className="w-[60%] max-md:w-[90%] rounded-[.1em] p-[.3em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                  type="text"
                  name="card_number"
                  value={paymentDetails.card_number}
                  onChange={handleChange}
                  required
                  placeholder="1234 5678 9012 3456"
                />
              </label>
              <label>
                Expiry Date:
                <input
                className="w-[60%] max-md:w-[90%] rounded-[.1em] p-[.3em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                  type="text"
                  name="expiry_date"
                  value={paymentDetails.expiry_date}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                />
              </label>
              <label>
                CVV:
                <input
                  className="w-[60%] max-md:w-[90%] rounded-[.1em] p-[.3em] border-[.2em] border-solid bg-[#f1fffc] border-[#f1fffc]"
                  type="text"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleChange}
                  required
                  placeholder="123"
                />
              </label>
            </section>
          )}
          <button onClick={handleInitiatePayment} disabled={!token || loading}>
            Initiate Payment
          </button>
        </form>
        </section>
      ) : (
        <p>Please log in to proceed with payment.</p>
      )}
    </div>
  );
};

export default PaymentPage;
