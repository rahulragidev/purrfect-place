// components/Chat.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { User } from "@/types/user";
import { Pet } from "@/types/pet";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  pet_id: string;
  content: string;
  created_at: string;
}

const Chat: React.FC<{ pet: Pet }> = ({ pet }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const fetchCurrentUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user", error);
      return;
    }
    setCurrentUser("5ed3b1e9-65f1-4510-808f-57888be503cd");
  };

  const sendMessage = async () => {
    if (!currentUser || messageContent.trim() === "") return;

    const { data: message, error } = await supabase
      .from("messages")
      .insert([
        {
          sender_id: currentUser,
          receiver_id: pet.provider_user_id, // Assuming this field exists
          pet_id: pet.pet_id,
          content: messageContent,
        },
      ])
      .single();

    if (error) {
      console.error("Error sending message", error);
      return;
    }

    setMessages([...messages, message]);
    setMessageContent("");
  };

  useEffect(() => {
    const subscription = supabase
      .from(`messages:pet_id=eq.${pet.pet_id}`)
      .on("INSERT", (payload) => {
        setMessages((prevMessages) => [...prevMessages, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [pet.pet_id]);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="flex flex-col p-4">
      <div className="overflow-auto mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 ${
              msg.sender_id === currentUser ? "text-right" : "text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <textarea
          className="flex-1 p-2 border rounded-md"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type a message..."
        ></textarea>
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
