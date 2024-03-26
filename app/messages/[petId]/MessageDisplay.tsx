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
    // Subscribe to new messages
    const subscription = supabase
      .channel("messages")
      .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {})
      .subscribe();

    return () => {
      // Cleanup subscription on component unmount
      subscription.unsubscribe();
    };
  }, [searchParams.petId, searchParams.provider_id, searchParams.user_id]); // Dependencies to re-subscribe if these params change

  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`border rounded-lg p-2 ${
            message.sender_id === searchParams.user_id
              ? "ml-auto bg-blue-900 w-fit"
              : "mr-auto bg-gray-900 w-fit"
          }`}
        >
          <div>
            <p>{message.content}</p>
            <p>{message.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageDisplay;
