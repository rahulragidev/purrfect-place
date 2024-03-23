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
  const [newMessageContent, setNewMessageContent] = useState(""); // New state for handling message input

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
        // Update messages state to reflect new changes
        fetchMessages(); // Or handle the new message directly to optimize
      })
      .subscribe();

    return () => {
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

  const sendMessage = async () => {
    // Prevent sending empty messages
    //if (!newMessageContent.trim()) return;

    const { data, error } = await supabase
      .from("messages")
      .insert([{ content: newMessageContent }])
      .single();

    if (error) {
      console.error("Error sending message:", error);
      return;
    }

    // Optionally clear the input after sending
    setNewMessageContent("");
  };

  return (
    <>
      <MessageList messages={messages} />
      <div className="text-black">
        <input
          type="text"
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
};

export default RealtimeMessages;
