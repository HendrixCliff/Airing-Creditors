import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { handleFlutterwaveWebhook, updateTransaction } from "../redux/transactionSlice";

export const useWebhookListener = (webhookData: any) => {
  const dispatch = useAppDispatch();

  // ✅ Polling every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(handleFlutterwaveWebhook(webhookData));
    }, 600000);

    return () => clearInterval(interval);
  }, [dispatch, webhookData]);

  // ✅ WebSocket connection for real-time updates
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => console.log("Connected to WebSocket");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(updateTransaction(data));
    };

    socket.onclose = () => console.log("WebSocket closed");

    return () => socket.close();
  }, [dispatch]);
};
