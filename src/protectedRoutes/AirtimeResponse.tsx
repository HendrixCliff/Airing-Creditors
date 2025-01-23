import React, { useEffect, useState } from 'react';
import { useAppDispatch} from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import {  clearMessages } from '../redux/airtimeSlice';
import { fetchAirtimeResponse } from '../redux/fetchData'

interface AirtimeResponse {
  transaction_id: string;
  amount: number;
  status: string;
  phoneNumber: string; 
  date: string;
}

const AirtimeResponse: React.FC = () => {
const dispatch = useAppDispatch();
const [airtimeResponses, setAirtimeResponses] = useState<AirtimeResponse[] | null>(null);
  const { loading, airtimeResponse, errorMessage } = useAppSelector((state) => state.airtime);
  
  useEffect(() => {
    if (!airtimeResponse) {
      dispatch(fetchAirtimeResponse());
    }
    const savedResponse = localStorage.getItem('airtimeResponse');
    if (savedResponse) {
      setAirtimeResponses(JSON.parse(savedResponse) as AirtimeResponse[]);
    }
  }, [dispatch, airtimeResponse]);

  
    return (
      <section className='border-solid border-[.7em] border-[#f1fffc]' >
        <h2>Past purchase details</h2>
        {loading && <p>Loading...</p>}
        {errorMessage && (
          <div>
            <p>Error: {errorMessage}</p>
            <button onClick={() => dispatch(clearMessages())}>Clear</button>
          </div>
        )}
        <section>
          {airtimeResponses && airtimeResponses.length > 0 ? (
            <ul>
              {airtimeResponses.map((response) => (
                <li key={response.transaction_id}>
                  <p>ID: {response.transaction_id}</p>
                  <p>Amount: {response.amount}</p>
                  <p>Status: {response.status}</p>
                  <p>Phone number: {response.phoneNumber}</p>
                  <p>Date: { response.date} </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No airtime purchase found in local storage.</p>
          )}
        </section>
      </section>
    );
};

export default AirtimeResponse;
