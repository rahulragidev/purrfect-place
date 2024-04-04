import { createClient } from "@/utils/supabase/server";
import { Chat } from "@/types/chats";

export async function fetchUserChats(userId: string): Promise<Chat[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .or(`provider_id.eq.${userId},adopter_id.eq.${userId}`);

  if (error) {
    console.error("Error fetching chats:", error);
    return [];
  }

  return data as Chat[];
}

export async function fetchChatById(
  chatId: string,
  userId: string
): Promise<{
  chat: Chat | null;
  receiverId: string | null;
  petId: string | null;
}> {
  const supabase = createClient();
  const { data: chat, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .single();

  if (error) {
    console.error("Error fetching chat:", error);
    return { chat: null, receiverId: null, petId: null };
  }

  const receiverId =
    chat.provider_id === userId
      ? chat.adopter_id
      : chat.adopter_id === userId
      ? chat.provider_id
      : null;
  const petId = chat.pet_id;

  return { chat: chat as Chat, receiverId, petId };
}
