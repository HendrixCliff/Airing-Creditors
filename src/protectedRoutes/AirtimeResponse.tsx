import React, { useEffect, useState } from "react";

interface AirtimeResponseData {
  transactionId: string;
  amount: number;
  status: string;
  phoneNumber: string;
  date: string;
}

const AirtimeResponseComponent: React.FC = () => {

  const [airtimeResponses, setAirtimeResponses] = useState<AirtimeResponseData[]>([]); // ✅ Default to empty array

  useEffect(() => {
    try {
      const savedResponse = localStorage.getItem("airtimeResponse");
      if (savedResponse) {
        const parsedData = JSON.parse(savedResponse) as AirtimeResponseData[];
        setAirtimeResponses(parsedData);
      }
    } catch (error) {
      console.error("Error parsing airtimeResponse from localStorage:", error);
    }
  }, []);

  return (
    <section className="w-full bg-dashboard-bg bg-cover bg-center bg-no-repeat min-h-screen relative mt-[.8em] overflow-hidden bg-gray-100">
      <h2 className="text-lg font-semibold mb-2">Past Purchase Details</h2>

      {airtimeResponses.length > 0 ? (
        <ul className="space-y-3">
          {airtimeResponses.map((response) => (
            <li
              className="flex justify-between border p-3 rounded-md shadow-md bg-white"
              key={response.transactionId}
            >
              <section className="flex flex-col">
                <p>
                  <strong>Status:</strong> {response.status}
                </p>
                <p>
                  <strong>Phone Number:</strong> {response.phoneNumber}
                </p>
                <p>
                  <strong>Date:</strong> {response.date}
                </p>
              </section>
              <section className="flex flex-col">
                <p>
                  <strong>ID:</strong> {response.transactionId}
                </p>
                <p>
                  <strong>Amount:</strong> ${response.amount}
                </p>
              </section>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No airtime purchase found in local storage.</p>
      )}
    </section>
  );
};

export default AirtimeResponseComponent;
