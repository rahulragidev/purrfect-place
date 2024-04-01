import React from "react";
import PropTypes from "prop-types";
import { Message } from "@/types/messages";

interface MessageListProps {
  messages: Message[];
  userId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, userId }) => {
  const getMessageDate = (timestamp: Date) => {
    const messageDate = new Date(timestamp);
    const today = new Date();

    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    } else {
      return messageDate.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto">
      {messages.map((message, index) => {
        const prevMessage = index > 0 ? messages[index - 1] : null;
        const currentDate = getMessageDate(message.created_at);
        const prevDate = prevMessage
          ? getMessageDate(prevMessage.created_at)
          : null;
        const showDateHeader = !prevMessage || currentDate !== prevDate;

        return (
          <div key={message.message_id}>
            {showDateHeader && (
              <div className="text-center text-gray-500 text-sm my-4">
                {currentDate}
              </div>
            )}
            <div
              className={`flex ${
                message.sender_id === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                  message.sender_id === userId
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-100 text-gray-800 self-start"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs text-gray-500 mt-1">
                  {new Date(message.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message_id: PropTypes.string.isRequired,
      sender_id: PropTypes.string.isRequired,
      receiver_id: PropTypes.string.isRequired,
      pet_id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.instanceOf(Date).isRequired,
      chat_id: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
        .isRequired,
    }).isRequired
  ).isRequired,
  userId: PropTypes.string.isRequired,
};

export default MessageList;
