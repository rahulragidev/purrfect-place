import { createClient } from "@/utils/supabase/server";
import { Chat } from "@/types/chats";

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

  let receiverId: string | null = null;
  let petId: string | null = null;

  if (chat.provider_id === userId) {
    // If the current user is the pet provider, the receiver is the adopter
    receiverId = chat.adopter_id;
  } else if (chat.adopter_id === userId) {
    // If the current user is the pet requester (adopter), the receiver is the provider
    receiverId = chat.provider_id;
  }

  petId = chat.pet_id;

  return { chat: chat as Chat, receiverId, petId };
}

export async function fetchChatsByProviderId(
  providerId: string
): Promise<Chat[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("provider_id", providerId);

  if (error) {
    console.error("Error fetching chats:", error);
    return [];
  }

  return data as Chat[];
}
