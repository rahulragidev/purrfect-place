import React from "react";

interface Message {
  id: number;
  content: string;
  sender_id: string;
  receiver_id: string;
}

interface Props {
  messages: Message[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <div key={message.id} className="border rounded-lg p-2">
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
