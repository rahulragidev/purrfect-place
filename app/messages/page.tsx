import React from "react";
import ChatList from "./ChatList";
import { fetchCurrentUserData } from "@/utils/users/fetchCurrentUserData";
import { fetchUserChats } from "@/utils/chats/fetchUserChats";

export default async function MessagesPage() {
  const user = await fetchCurrentUserData();
  const user_id = user?.id ?? "";
  const chats = await fetchUserChats(user_id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chats</h1>
      <ChatList chats={chats} userId={user_id} />
    </div>
  );
}
