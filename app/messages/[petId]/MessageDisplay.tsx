"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import { Message } from "@/types/messages";

const MessageDisplay = ({
  searchParams,
  pastMessages,
}: {
  searchParams: {
    petId: string;
    provider_id: string;
    user_id: string;
  };
  pastMessages: Message[];
}) => {
  // Initialize messages state with pastMessages
  const [messages, setMessages] = useState<Message[]>(pastMessages);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("pet_id", searchParams.petId)
        .or(
          `sender_id.eq.${searchParams.user_id},receiver_id.eq.${searchParams.provider_id}`
        );

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data);
      }
    };

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `pet_id=eq.${searchParams.petId} AND (sender_id=eq.${searchParams.user_id} AND receiver_id=eq.${searchParams.provider_id})`,
        },
        (payload) => {
          console.log("Received message update:", payload);
          fetchMessages();
        }
      )
      .subscribe();

    fetchMessages();

    return () => {
      // Cleanup subscription on component unmount
      subscription.unsubscribe();
    };
  }, [messages]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
  };

  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`border rounded-lg p-2 ${
            message.sender_id === searchParams.user_id
              ? "ml-auto bg-blue-900 text-white w-fit"
              : "mr-auto bg-gray-900 text-white w-fit"
          }`}
        >
          <div>
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageDisplay;
