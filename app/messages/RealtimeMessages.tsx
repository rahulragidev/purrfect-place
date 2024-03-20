"use client";
import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import { supabase } from "@/utils/supabase/client";

interface Message {
  id: number;
  sender_id: string;
  receiver_id: string;
  pet_id: string;
  content: string;
  timestamp: string;
  is_read: boolean;
}

const RealtimeMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      setMessages(data || []);
    };

    fetchMessages();

    const subscription = supabase
      .channel("messages")
      .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
        console.log(payload);
      })
      .subscribe();

    // Return a synchronous cleanup function
    return () => {
      // Call the asynchronous unsubscribe inside a synchronous function
      subscription
        .unsubscribe()
        .then((response) => {
          console.log("Subscription response:", response);
        })
        .catch((error) => {
          console.error("Error unsubscribing:", error);
        });
    };
  }, []);

  return <MessageList messages={messages} />;
};

export default RealtimeMessages;
