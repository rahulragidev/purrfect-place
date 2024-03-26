import RealtimeMessages from "./RealtimeMessages";
import { PageParams } from "@/types/pageParams";
import { createClient } from "@/utils/supabase/server";
import React from "react";

async function MessagesPage({ params }: PageParams) {
  const userId = async (): Promise<string> => {
    "use server";
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error("Error fetching user: " + error.message);
    }
    if (!data.user || !data.user.id) {
      throw new Error("User ID is undefined");
    }
    return data.user.id;
  };

  const fetchPetProvider = async () => {
    "use server";
    const supabase = createClient();
    const { data: provider_user_id, error } = await supabase
      .from("pets")
      .select("provider_user_id")
      .eq("pet_id", params.petId)
      .single();

    if (error) {
      console.error("Error fetching pet provider:", error.message);
      return;
    }
    return provider_user_id.provider_user_id;
  };
  const petId = params.petId;
  const provider_id = await fetchPetProvider();
  const user_id = await userId();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Connect with the Pet Provider</h1>
      <RealtimeMessages
        searchParams={{
          petId,
          provider_id,
          user_id,
        }}
      />
    </div>
  );
}

export default MessagesPage;
