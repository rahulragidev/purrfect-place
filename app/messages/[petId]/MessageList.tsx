import { Message } from "@/types/messages";
import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function MessageList({
  searchParams,
}: {
  searchParams: {
    petId: string;
    provider_id: string;
    user_id: string;
  };
}) {
  async function messages(): Promise<Message[]> {
    "use server";
    const supabase = createClient();
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("pet_id", searchParams.petId)
      .eq("receiver_id", searchParams.provider_id)
      .eq("sender_id", searchParams.user_id)
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
    return data;
  }

  const pastMessages = await messages();
  return (
    <div className="space-y-2">
      {pastMessages?.map((message) => (
        <div key={message.id} className="border rounded-lg p-2">
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
}
