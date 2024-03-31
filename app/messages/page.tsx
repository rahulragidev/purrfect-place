import React from "react";
import { userId } from "@/app/auth/loader.auth";
import { fetchChats } from "./loader";
import ChatList from "./ChatList";

export default async function MessagesPage() {
  const user_id = await userId();
  const chats = await fetchChats(user_id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chats</h1>
      <ChatList chats={chats} userId={user_id} />
    </div>
  );
}
