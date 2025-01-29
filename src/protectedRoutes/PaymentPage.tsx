import React from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { initiatePayment } from '../redux/fetchData';




const PaymentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, status } = useAppSelector((state) => state.payment);
  const { isLoggedIn, token} = useAppSelector((state) => state.auth);
 

  interface PaymentDetails {
    email: string;
    amount: number | string;
    phone: string; // Separate field for phone input
    phoneNumber: string; // Concatenated country code + phone
    currency: string;
    payment_option: string;
    tx_ref: string;
    card_number: string;
    expiry_date: string;
    cvv: string;
    card_type?: string;
    countryCode: string; // Made non-optional for consistency
    [key: string]: string | number | undefined;
  }
  
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    email: '',
    amount: 0,
    phone: '', // Separate phone field for input
    phoneNumber: '+234', // Default phone number starts with default country code
    currency: 'NGN',
    payment_option: 'card',
    tx_ref: `txn_${new Date().getTime()}`,
    card_number: '',
    expiry_date: '',
    cvv: '',
    countryCode: '+234', // Default country code
    card_type: '',
  });
  

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setPaymentDetails((prev) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const updatedDetails = { ...prev };
  
      // Handle `amount` parsing
      if (name === 'amount') {
        updatedDetails[name] = value === '' ? '' : parseFloat(value) || 0;
      }
      // Handle `phone` updates
      else if (name === 'phone') {
        updatedDetails[name] = value.replace(/^0+/, '');
      }
      // Handle `email` validation
      else if (name === 'email') {
        updatedDetails[name] = value !== '' && emailRegex.test(value) ? value : prev.email;
      }
      // General case for other inputs
      else {
        updatedDetails[name] = value;
      }
  
      // Combine `countryCode` and `phone` into `phoneNumber`
      if (name === 'countryCode' || name === 'phone') {
        updatedDetails.phoneNumber = `${updatedDetails.countryCode || ''}${updatedDetails.phone || ''}`;
      }
  
      return updatedDetails;
    });
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
        amount: typeof paymentDetails.amount === 'string' ? parseFloat(paymentDetails.amount) || 0 : paymentDetails.amount, // Ensure amount is a number
        payment_option: 'card', // Explicitly specify card payment option
      };
  
     
      const result = await dispatch(initiatePayment(paymentPayload)).unwrap();
      console.log('Payment initiated successfully:', result);
    } catch (err) {
      console.error('Payment initiation failed:', err);
    }
  };
  

  return (
<section className="w-full">
  {!isLoggedIn ? (
    <section className="w-full">
      {loading && <p>Processing payment...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <h2 className="text-center mb-4">Payment Page</h2>
      <form
        className="grid grid-cols-2 gap-4 max-md:ml-[.9em] mx-[auto] max-md:gap-[.4em] border-[.2em] border-solid w-[90%] max-md:w-[90%] p-6 max-md:p-[.4em]"
        onSubmit={handleInitiatePayment}
      >
        {/* Email */}
        <label className="flex flex-col gap-2 max-md:text-[.8em] text-[1rem] col-span-2 md:col-span-1">
          Email
          <input
            className="w-full rounded-[.1em] p-[.2em] max-md:text-[.8em] max-md:p-[.1em] border-[.2em]"
            type="email"
            name="email"
            value={paymentDetails.email}
            onChange={handleChange}
            required
          />
        </label>

        {/* Amount */}
        <label className="flex flex-col max-md:text-[.8em]  gap-2 text-[1rem]  col-span-2 md:col-span-1">
          Amount
          <input
            className="w-full rounded-[.1em] p-[.2em] max-md:p-[.1em] border-[.2em]"
            type="number"
            name="amount"
            value={paymentDetails.amount}
            onChange={handleChange}
            required
          />
        </label>

        {/* Phone Number */}
        <label className="flex flex-col max-md:text-[.8em] max-md:gap-[.4em] gap-2 text-[1rem]  col-span-2">
          Phone Number
          <div className="flex gap-2">
            {/* Country Code */}
            <select
  className="w-1/4 rounded-[.1em] p-[.2em] max-md:p-[.1em] border-[.2em]"
  name="countryCode"
  value={paymentDetails.countryCode || "+234"}
  onChange={(e) => {
    const { value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      countryCode: value,
      phoneNumber: `${value}${prev.phone || ''}`, // Update phoneNumber directly
    }));
  }}
  required
>
  <option value="+234">+234 (Nigeria)</option>
</select>

{/* Phone Number Input */}
<input
  className="w-3/4 rounded-[.1em] max-md:p-1 p-[.2em] border-[.2em]"
  type="text"
  name="phone"
  value={paymentDetails.phone}
  onChange={handleChange}
  required
  placeholder="Enter phone number"
/>

          </div>
        </label>

        {/* Currency */}
        <label className="flex flex-col max-md:text-[.8em] max-md:gap-[.4em] gap-2 text-[1rem] col-span-2 md:col-span-1">
          Currency
          <select
            name="currency"
            className="w-full rounded-[.1em] max-md:p-1 p-[.2em] border-[.2em]"
            value={paymentDetails.currency}
            onChange={handleChange}
            required
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="NGN">NGN</option>
          </select>
        </label>

        {/* Payment Option */}
        <label className="flex flex-col gap-2 max-md:text-[.8em] max-md:gap-[.4em] text-[1rem] col-span-2 md:col-span-1">
          Payment Option
          <select
            name="payment_option"
            className="w-full rounded-[.1em] max-md:p-1 p-[.2em] border-[.2em]"
            value={paymentDetails.payment_option}
            onChange={handleChange}
            required
          >
            <option value="card">Card</option>
            <option value="mobilemoneyghana">Mobile Money (Ghana)</option>
            <option value="ussd">USSD</option>
          </select>
        </label>

        {/* Card Details (if payment_option is 'card') */}
        {paymentDetails.payment_option === "card" && (
          <>
            <label className="flex flex-col max-md:text-[.8em] max-md:gap-[.4em] gap-2 text-[1rem] col-span-2 md:col-span-1">
              Card Number
              <input
                className="w-full rounded-[.1em] max-md:p-[.1em] p-[.2em] border-[.2em]"
                type="text"
                name="card_number"
                value={paymentDetails.card_number}
                onChange={handleCardDetails}
                required
                placeholder="1234 5678 9012 3456"
              />
              {paymentDetails.card_type && (
                <p className="text-sm text-gray-600 mt-1">
                  {paymentDetails.card_type}
                </p>
              )}
            </label>

            <label className="flex flex-col max-md:text-[.8em] max-md:gap-[.4em] gap-2 text-[1rem] col-span-2 md:col-span-1">
              Expiry Date
              <input
                className="w-full rounded-[.1em] max-md:p-[.1em] p-[.2em] border-[.2em]"
                type="text"
                name="expiry_date"
                value={paymentDetails.expiry_date}
                onChange={handleExpiryDate}
                required
                placeholder="MM/YY"
                maxLength={5}
              />
            </label>

            <label className="flex flex-col max-md:text-[.8em] gap-2 text-[1rem] col-span-2 md:col-span-1">
              CVV
              <input
                className="w-full rounded-[.1em] max-md:p-[.1em]  p-[.2em] border-[.2em]"
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={(e) => {
                  const { value } = e.target;
                  if (/^\d{0,3}$/.test(value)) {
                    handleChange(e);
                  }
                }}
                required
                placeholder="123"
                pattern="\d{3}"
                title="Please enter exactly 3 numeric digits"
              />
            </label>
          </>
        )}
         {status && <p>Initiation Status: {status}</p>}
        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 bg-[#c8a7ff] text-white max-[600px]:w-[50%] max-[550px]:w-[60%] max-w-[50%] font-bold max-md:text-md text-lg rounded-[.2em]  mx-[auto]"
          disabled={
            !token ||
            loading ||
            !paymentDetails.email ||
            !paymentDetails.amount ||
            !paymentDetails.phoneNumber
          }
        >
          {loading ? "Processing..." : "Initiate Payment"}
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
