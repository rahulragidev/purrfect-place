import { Chat } from "@/types/chats";
import Link from "next/link";
import React from "react";

interface ChatListProps {
  chats: Chat[];
  userId: string;
}

const ChatList: React.FC<ChatListProps> = ({ chats, userId }) => {
  return (
    <div>
      {chats.map((chat) => (
        <Link key={chat.id} href={`/messages/${chat.id}`}>
          <div className="border p-4 mb-4 rounded-3xl">
            <p>Chat ID: {chat.id}</p>
            <p>Pet ID: {chat.petId}</p>
            <p>
              {chat.adopterId === userId ? "Adopter ID" : "Provider ID"}:{" "}
              {chat.adopterId === userId ? chat.providerId : chat.adopterId}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ChatList;
