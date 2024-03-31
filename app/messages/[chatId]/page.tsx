import React from "react";
import { userId } from "@/app/auth/loader.auth";
import RealtimeMessages from "./RealtimeMessages";
import { PageParams } from "@/types/pageParams";
import { fetchChatById } from "./messages.loader";

export default async function ChatPage({ params }: PageParams) {
  const user_id = await userId();
  const chatId = params.chatId;
  const { chat, receiverId, petId } = await fetchChatById(chatId, user_id);

  if (!chat) {
    return <div>Chat not found</div>;
  }

  return (
    <div className="p-4">
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
