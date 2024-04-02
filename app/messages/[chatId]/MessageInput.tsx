"use client";

import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

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

  const handleKeyPress = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
      <div className="flex items-end">
        <textarea
          className="flex-1 border rounded-lg p-3 text-black focus:outline-none resize-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1}
          style={{ minHeight: "48px", maxHeight: "120px" }}
        />
        <button
          className="bg-blue-500 text-white rounded-full p-3 ml-4 focus:outline-none hover:bg-blue-600 transition-colors duration-200"
          onClick={handleSend}
        >
          <IoSend className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
