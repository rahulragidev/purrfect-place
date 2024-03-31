"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import { Message } from "@/types/messages";

const MessageDisplay = ({
  searchParams,
  pastMessages,
}: {
  searchParams: { chatId: string; user_id: string };
  pastMessages: Message[];
}) => {
  const [messages, setMessages] = useState<Message[]>(pastMessages);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", searchParams.chatId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data || []);
      }
    };

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${searchParams.chatId}`,
        },
        (payload) => {
          console.log("Received new message:", payload);
          fetchMessages();
        }
      )
      .subscribe();

    fetchMessages();

    return () => {
      subscription.unsubscribe();
    };
  }, [searchParams.chatId]);

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
