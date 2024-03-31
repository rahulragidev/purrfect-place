import { userId } from "@/app/auth/loader.auth";
import RealtimeMessages from "./RealtimeMessages";
import { PageParams } from "@/types/pageParams";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { fetchPetProvider } from "@/app/pets/pets.loader";

async function MessagesPage({ params }: PageParams) {
  const petId = params.petId;
  const provider_id = await fetchPetProvider(petId);
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
