import React from "react";

interface Message {
  id: number;
  sender_id: string;
  receiver_id: string;
  pet_id: string;
  content: string;
  timestamp: string;
  is_read: boolean;
}

interface Props {
  messages: Message[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
  console.log("These are messages : " + messages);
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
