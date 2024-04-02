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
