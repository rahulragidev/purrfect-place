import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Message } from "@/types/messages";
import { format, isSameDay } from "date-fns";
import { FaUser } from "react-icons/fa";

interface MessageListProps {
  messages: Message[];
  userId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, userId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const getMessageDate = (timestamp: Date) => {
    const messageDate = new Date(timestamp);
    const today = new Date();

    if (isSameDay(messageDate, today)) {
      return "Today";
    } else {
      return format(messageDate, "MMM d, yyyy");
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto w-full pb-20">
      {messages.map((message, index) => {
        const prevMessage = index > 0 ? messages[index - 1] : null;
        const currentDate = getMessageDate(message.created_at);
        const prevDate = prevMessage
          ? getMessageDate(prevMessage.created_at)
          : null;
        const showDateHeader = !prevMessage || currentDate !== prevDate;
        const isUserMessage = message.sender_id === userId;

        return (
          <div key={message.message_id} className="flex flex-col w-full">
            {showDateHeader && (
              <div className="text-center text-gray-400 text-xs my-2 font-medium">
                {currentDate}
              </div>
            )}
            <div
              className={`flex items-end ${
                isUserMessage ? "justify-end" : "justify-start"
              } w-full`}
            >
              <div
                className={`flex items-center ${
                  isUserMessage ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isUserMessage ? "bg-blue-500 ml-2" : "bg-gray-300 mr-2"
                  }`}
                >
                  <FaUser className="text-white" />
                </div>
                <div
                  className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl shadow ${
                    isUserMessage
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm md:text-base break-words">
                    {message.content}
                  </p>
                  <span className="text-xs text-gray-400 mt-1 block text-right">
                    {format(new Date(message.created_at), "h:mm a")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
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
