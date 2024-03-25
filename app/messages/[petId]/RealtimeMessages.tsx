"use client";
import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import { supabase } from "@/utils/supabase/client";
import { fetchUserDetails } from "../user.loader";

// Define the Message interface for TypeScript
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
  const [newMessageContent, setNewMessageContent] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("message_id", { ascending: true });

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
        fetchMessages();
      })
      .subscribe();

    return () => {
      subscription
        .unsubscribe()
        .then(() => console.log("Unsubscribed from the messages channel."))
        .catch((error) => console.error("Error unsubscribing:", error));
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessageContent.trim()) return;
    alert(newMessageContent);
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          sender_id: "5ed3b1e9-65f1-4510-808f-57888be503cd",
          receiver_id: "5ed3b1e9-65f1-4510-808f-57888be503cd",
          pet_id: "7c4f1b10-a21e-4fc5-bd6c-805799444b7a",
          content: newMessageContent,
        },
      ])
      .single();

    console.log(data);
    console.log(error);

    if (error) {
      console.error("Error sending message:", error);
      return;
    }

    setNewMessageContent("");
  };

  return (
    <div className="p-4">
      <MessageList messages={messages} />
      <div className="flex mt-4">
        <input
          type="text"
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        />
        <button
          onClick={sendMessage}
          className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default RealtimeMessages;
