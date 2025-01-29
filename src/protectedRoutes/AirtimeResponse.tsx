import React, { useEffect, useState } from "react";
import { fetchAirtimeResponse } from "../redux/fetchData";


interface AirtimeResponseData {
  transactionId: string;
  amount: number;
  status: string;
  phoneNumber: string;
  date: string;
}

const AirtimeResponseComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [airtimeResponses, setAirtimeResponses] = useState<AirtimeResponseData[] | null>(null);
  

  useEffect(() => {
    
    const savedResponse = localStorage.getItem("airtimeResponse");
    if (savedResponse) {
      setAirtimeResponses(JSON.parse(savedResponse) as AirtimeResponseData[]);
    }
  }, []);

  return (
    <section className="border-solid border-[.7em] border-[#f1fffc] p-4">
      <h2 className="text-lg font-semibold mb-2">Past Purchase Details</h2>

      {airtimeResponses && airtimeResponses.length > 0 ? (
        <ul className="space-y-3">
          {airtimeResponses.map((response) => (
            <li className="flex justify-between border p-3 rounded-md shadow-md bg-white" key={response.transactionId}>
              <section className="flex flex-col">
                <p><strong>Status:</strong> {response.status}</p>
                <p><strong>Phone Number:</strong> {response.phoneNumber}</p>
                <p><strong>Date:</strong> {response.date}</p>
              </section>
              <section className="flex flex-col">
                <p><strong>ID:</strong> {response.transactionId}</p>
                <p><strong>Amount:</strong> ${response.amount}</p>
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
