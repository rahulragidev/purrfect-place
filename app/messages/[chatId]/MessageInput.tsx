"use client";
import React, { useState } from "react";

interface MessageInputProps {
  onSend: (content: string) => Promise<void>;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (message.trim() !== "") {
      await onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await handleSend();
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        className="flex-1 border rounded-l-lg px-4 py-2 text-black"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-blue-500 rounded-r-lg px-4 py-2"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
