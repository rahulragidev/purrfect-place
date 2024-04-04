import React from "react";
import RealtimeMessages from "./RealtimeMessages";
import { PageParams } from "@/types/pageParams";
import { fetchCurrentUserData } from "@/utils/users/fetchCurrentUserData";
import { fetchChatById } from "@/utils/chats/fetchUserChats";

export default async function ChatPage({ params }: PageParams) {
  const user = await fetchCurrentUserData();
  const user_id = user?.id ?? "";
  const chatId = params.chatId;
  const { chat, receiverId, petId } = await fetchChatById(chatId, user_id);

  if (!chat) {
    return <div>Chat not found</div>;
  }

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Chat Messages</h1>
      <RealtimeMessages
        chatId={chatId}
        userId={user_id}
        receiverId={receiverId}
        petId={petId}
      />
    </div>
  );
}
