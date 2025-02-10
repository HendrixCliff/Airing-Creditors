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
    <div>
      <h2>Choose Transaction Action</h2>
      {status && <h3>{status}</h3>}
      {amount && <h3>{amount}</h3>}
      <input
        type="text"
        name="transactionId"
        placeholder="Transaction ID"
        value={formData.transactionId ?? ""}
        onChange={handleChange}
      />
      
      <select name="action" value={formData.action ?? ""} onChange={handleChange}>
        <option value="airtime">Send Airtime</option>
        <option value="refund">Request Refund</option>
      </select>

      {formData.action === "refund" && (
        <>
          <input
            type="text"
            name="accountBank"
            placeholder="Bank Name"
            value={formData.accountBank ?? ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="accountNumber"
            placeholder="Account Number"
            value={formData.accountNumber ?? ""}
            onChange={handleChange}
          />
        </>
      )}

      <button onClick={handleAction} disabled={loading}>
        {loading ? "Processing..." : "Submit"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default TransactionAction;
