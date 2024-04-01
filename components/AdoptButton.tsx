"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { InsertChatData } from "@/types/chats";
import { Message } from "@/types/messages";
import { Pet } from "@/types/pet";
import PropTypes from "prop-types";

interface AdoptButtonProps {
  pet: Pet;
  adopterId: string | null;
}

export const AdoptButton: React.FC<AdoptButtonProps> = ({ pet, adopterId }) => {
  const router = useRouter();

  const adoptPet = async () => {
    if (!adopterId) {
      router.push("/login");
      return;
    }

    if (!pet.provider_user_id || !pet.pet_id) {
      console.error("Missing required pet properties");
      router.push("/error");
      return;
    }

    try {
      const { data: chatData, error: chatError } = await supabase
        .from("chats")
        .insert({
          adopter_id: adopterId,
          provider_id: pet.provider_user_id,
          pet_id: pet.pet_id,
        } as InsertChatData)
        .select("id")
        .single();

      if (chatError) {
        throw chatError;
      }

      if (chatData && "id" in chatData) {
        const chatId = chatData.id;
        const messageContent = `Hey! I want to adopt ${pet.name}!`;

        const { error: messageError } = await supabase.from("messages").insert({
          sender_id: adopterId,
          receiver_id: pet.provider_user_id,
          pet_id: pet.pet_id,
          content: messageContent,
          chat_id: chatId,
        } as Message);

        if (messageError) {
          throw messageError;
        }

        router.push(`/messages/${chatId}`);
      } else {
        throw new Error("Chat data does not have an 'id' property");
      }
    } catch (error) {
      console.error("Error adopting pet:", error);
      router.push("/error");
    }
  };

  const handleAdoptClick = async () => {
    await adoptPet();
  };

  return (
    <button
      onClick={() => handleAdoptClick().catch(console.error)}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
    >
      <span className="mr-2">Adopt {pet.name}</span>
      <span className="text-xl">&#x1f43e;</span>
    </button>
  );
};
