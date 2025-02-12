import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { chooseTransactionAction } from "../redux/chooseTransactionSlice";

const TransactionAction: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, successMessage } = useAppSelector((state) => state.chooseTransaction);
  const { transactionId, amount, status } = useAppSelector((state) => state.transaction);
  // ✅ Single state object
  const [formData, setFormData] = useState({
    transactionId: transactionId,
    action: "airtime" as "airtime" | "refund",
    accountBank: "",
    accountNumber: "",
  });

  // ✅ Handle input change dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAction = () => {
    dispatch(
      chooseTransactionAction({
        transactionId: formData.transactionId,
        action: formData.action,
        account_bank: formData.action === "refund" ? formData.accountBank : undefined,
        account_number: formData.action === "refund" ? formData.accountNumber : undefined,
      })
    );
  };

  return (
<section className="max-w-[100%] max-[500px]:w-[100%] mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
  <h2 className="text-xl font-semibold text-gray-700">Select Transaction Type</h2>

  {status && <h3 className="text-gray-600 font-medium">{status}</h3>}
  {amount && <h3 className="text-gray-600 font-medium">Amount: {amount}</h3>}

  <section className="grid grid-cols-1 gap-4">
    {/* Transaction ID */}
    <section>
      <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
      <input
        type="text"
        name="transactionId"
        placeholder="Transaction ID will appear here"
        value={formData.transactionId ?? ""}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </section>

    {/* Action Select */}
    <section>
      <label className="block text-sm font-medium text-gray-700">Select Action</label>
      <select
        name="action"
        value={formData.action ?? ""}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="airtime">Send Airtime</option>
        <option value="refund">Request Refund</option>
      </select>
    </section>

    {/* Refund Fields (Conditionally Rendered) */}
    {formData.action === "refund" && (
      <>
        <section>
          <label className="block text-sm font-medium text-gray-700">Bank Name</label>
          <input
            type="text"
            name="accountBank"
            placeholder="Enter Bank Name"
            value={formData.accountBank ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </section>

        <section>
          <label className="block text-sm font-medium text-gray-700">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            placeholder="Enter Account Number"
            value={formData.accountNumber ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </section>
      </>
    )}
  </section>

  {/* Submit Button */}
  <button
    onClick={handleAction}
    disabled={loading}
    className={`w-full py-2 text-white font-medium rounded-md ${
      loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
    }`}
  >
    {loading ? "Processing..." : "Submit"}
  </button>

  {/* Messages */}
  {error && <p className="text-red-500 text-sm">{error}</p>}
  {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
</section>

  );
};

export default TransactionAction;
