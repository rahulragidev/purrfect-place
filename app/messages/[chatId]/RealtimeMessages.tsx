"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import { Message } from "@/types/messages";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import PropTypes from "prop-types";

interface RealtimeMessagesProps {
  chatId: string;
  userId: string;
  receiverId: string | null;
  petId: string | null;
}

const RealtimeMessages: React.FC<RealtimeMessagesProps> = ({
  chatId,
  userId,
  receiverId,
  petId,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data || []);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel(`messages:${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          console.log("Received new message:", payload);
          setMessages((prevMessages) => [
            ...prevMessages,
            payload.new as Message,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (content.trim() !== "" && receiverId) {
      const { error } = await supabase.from("messages").insert([
        {
          sender_id: userId,
          receiver_id: receiverId,
          pet_id: petId,
          chat_id: chatId,
          content: content,
        },
      ]);

      if (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messages} userId={userId} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
};

RealtimeMessages.propTypes = {
  userId: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
  receiverId: PropTypes.string,
  petId: PropTypes.string,
};

export default RealtimeMessages;
