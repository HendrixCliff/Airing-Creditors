import React, { useState, useEffect } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { initiatePayment } from '../redux/fetchData';


const PaymentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.payment);
  const { isLoggedIn, token} = useAppSelector((state) => state.auth);
  // git remote add origin https://github.com/HendrixCliff/Airing-Creditor-Backend
//git push -u origin master

  useEffect(() => {
    if (!isLoggedIn) {
      // Optionally redirect to login page or show a prompt for guests
     alert('You need to be logged in to make a payment.');

    }
  }, [isLoggedIn]);

  interface PaymentDetails {
    email: string;
    amount: number;
    phone: string;
    currency: string;
    payment_option: string;
    tx_ref: string;
    card_number: string;
    expiry_date: string;
    cvv: string;
    card_type?: string;
    countryCode?: string;
  }

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    email: '',
    amount: 0,
    phone: '',
    currency: 'NGN',
    payment_option: 'card',
    tx_ref: `txn_${new Date().getTime()}`,
    card_number: '',
    expiry_date: '',
    cvv: '',
    countryCode: '+234',
    card_type: '',
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };
  const validateExpiryDate = (expiryDate: string) => {
    const [month, year] = expiryDate.split('/').map(Number);
  
    if (!month || !year) return false; // Ensure both month and year are present
    if (month < 1 || month > 12) return false; // Month should be between 01 and 12
  
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
    const currentMonth = new Date().getMonth() + 1;
  
    // Ensure the year is not in the past and the date is not expired
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }
  
    return true;
  };
const handleExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
  let formattedInput = input;

  // Add '/' separator automatically
  if (input.length > 2) {
    formattedInput = `${input.slice(0, 2)}/${input.slice(2, 4)}`;
  }

  // Limit input to MM/YY format
  if (formattedInput.length <= 5) {
    setPaymentDetails((prev) => ({
      ...prev,
      expiry_date: formattedInput,
    }));
  }
}
const detectCardType = (cardNumber: string) => {
  //const cardNumberPrefix = cardNumber.slice(0, 6); // Get the first 6 digits

  if (/^4/.test(cardNumber)) {
    return 'Visa';
  } else if (/^5[1-5]/.test(cardNumber)) {
    return 'Mastercard';
  } else if (/^506[0-9]|^507[0-9]|^650[0-9]/.test(cardNumber)) {
    return 'Verve';
  } else if (/^3[47]/.test(cardNumber)) {
    return 'American Express';
  } else if (/^6(?:011|5)/.test(cardNumber)) {
    return 'Discover';
  } else {
    return 'Unknown'; // Card type not recognized
  }
};
const handleCardDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
     const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
      const cardType = detectCardType(input); // Detect the card type based on input

      setPaymentDetails((prev) => ({
        ...prev,
        card_number: input,
        card_type: cardType, 
      }));
}
  // Handle initiating payment
  const handleInitiatePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateExpiryDate(paymentDetails.expiry_date)) {
      alert('Invalid expiry date. Please enter a valid MM/YY.');
      return;
    }
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
    <section>
      {!isLoggedIn ? (
        <section >
          {loading && <p>Processing payment...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <h2 className="text-center">Payment Page</h2>
          <form className="border-[.2em]  border-solid w-[80%] max-md:w-[98%]  mr-[2em] h-[24em] max-md:ml-[auto] max-md:mr-[1em] ml-[auto]" onSubmit={handleInitiatePayment} >
           <section className="flex w-[100%] mt-[1em]">
            <section className="w-[100%] max-md:ml-[1em] ml-[3em]">
              <label className="flex flex-col gap-[.5em] text-[1.2rem]">
                Email
                <input
                  className="w-[80%] text-semibold rounded-[.1em] p-[.3em] border-[.2em]"
                  type="email"
                  name="email"
                  value={paymentDetails.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="flex flex-col gap-[.5em] text-[1.2rem]">
                Amount
                <input
                  className="w-[80%] text-semibold  rounded-[.1em] p-[.3em] border-[.2em]"
                  type="number"
                  name="amount"
                  value={paymentDetails.amount}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="flex flex-col gap-[.5em] text-[1.2rem]">
                Phone Number
                <section className="flex items-center">
                  {/* Country Code Dropdown */}
                  <select
                    className="w-[20%] rounded-[.1em] p-[.3em] border-[.2em] border-solid"
                    name="countryCode"
                    value={paymentDetails.countryCode || '+234'} // Default to Nigeria
                    onChange={(e) =>
                      setPaymentDetails((prev) => ({
                        ...prev,
                        countryCode: e.target.value, // Update the selected country code
                      }))
                    }
                    required
                  >
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+91">+91 (India)</option>
                    <option value="+234">+234 (Nigeria)</option>
                    <option value="+81">+81 (Japan)</option>
                    {/* Add more country codes as needed */}
                  </select>

                  {/* Phone Number Input */}
                  <input
                    className="w-[60%] ml-[.5em] rounded-[.1em] p-[.3em] border-[.2em] border-solid"
                    type="text"
                    name="phone"
                    value={paymentDetails.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter phone number"
                  />
                </section>
              </label>
              <label className="flex flex-col max-md:mt-[.5em] gap-[.4em] text-[1.2rem]">
                Currency
                <select
                  name="currency"
                  className="max-md:w-[60%]"
                  value={paymentDetails.currency}
                  onChange={handleChange}
                  required
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="NGN">NGN</option>
                </select>
              </label>
            </section>
            {paymentDetails.payment_option === 'card' && (
              <section className="w-[100%]">
                <label className="flex flex-col gap-[.5em] text-[1.2rem]">
                  Card Number
                  <input
                    className="w-[85%] rounded-[.1em] p-[.3em] border-[.2em]"
                    type="text"
                    name="card_number"
                    value={paymentDetails.card_number}
                    onChange={handleCardDetails}
                    required
                    placeholder="1234 5678 9012 3456"
                  />
                  {/* Display detected card type */}
                  {paymentDetails.card_type && (
                    <p className="text-[1rem] text-gray-600 mt-[.5em]">
                       {paymentDetails.card_type}
                    </p>
                  )}
                </label>

                <label className="flex flex-col gap-[.5em] text-[1.2rem]">
                  Expiry Date
                  <input
                    className="w-[60%] rounded-[.1em] p-[.3em] border-[.2em]"
                    type="text"
                    name="expiry_date"
                    value={paymentDetails.expiry_date}
                    onChange={handleExpiryDate}
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                  />

                </label>
                <label className="flex flex-col gap-[.5em] text-[1.2rem]">
                  CVV
                  <input
                    className="w-[60%] rounded-[.1em] p-[.3em] border-[.2em]"
                    type="text"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handleChange}
                    required
                    placeholder="123"
                  />
                </label>
                <label className="flex flex-col gap-[.4em] max-md:mt-[.5em] text-[1.2rem]">
                Payment Option
                <select
                  name="payment_option"
                  className="max-md:w-[60%]"
                  value={paymentDetails.payment_option}
                  onChange={handleChange}
                  required
                >
                  <option value="card">Card</option>
                  <option value="mobilemoneyghana">Mobile Money (Ghana)</option>
                  <option value="ussd">USSD</option>
                </select>
              </label>
              </section>
            )}
            </section>
            <button
              type="submit"
              className="mt-[1em] max-md:mt-[1.5em]  text-center font-bold rounded-[1em] max-md:p-[.4em] text-[1.5rem] max-md:text-[1rem] text-[#f1fffc] border-solid bg-[#c8a7ff] w-[40%] max-md:w-[70%] max-md:ml-[3em] ml-[9em]"
              disabled={
                !token ||
                loading ||
                !paymentDetails.email ||
                !paymentDetails.amount ||
                !paymentDetails.phone
              }
            >
              {loading ? 'Processing...' : 'Initiate Payment'}
            </button>
          </form>
        
        </section>
      ) : (
        <p>Please log in to proceed with payment.</p>
      )}
    </section>
  );
};

export default PaymentPage;
