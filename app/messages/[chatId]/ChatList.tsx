import { Chat } from "@/types/chats";
import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";

interface ChatListProps {
  chats: Chat[];
  userId: string;
}

const ChatList: React.FC<ChatListProps> = ({ chats, userId }) => {
  return (
    <div>
      {chats.map((chat) => (
        <Link key={chat.id} href={`/messages/${chat.id}`}>
          <div className="border p-4 mb-4">
            <p>Chat ID: {chat.id}</p>
            <p>Pet ID: {chat.pet_id}</p>
            <p>
              {chat.adopter_id === userId ? "Adopter ID" : "Provider ID"}:{" "}
              {chat.adopter_id === userId ? chat.provider_id : chat.adopter_id}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

ChatList.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      pet_id: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
        .isRequired,
      adopter_id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null]),
      ]).isRequired,
      provider_id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null]),
      ]).isRequired,
      created_at: PropTypes.instanceOf(Date).isRequired,
    }).isRequired
  ).isRequired,
  userId: PropTypes.string.isRequired,
};

export default ChatList;
