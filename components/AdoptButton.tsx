"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { InsertChatData } from "@/types/chats";
import { Message } from "@/types/messages";
import { Pet } from "@/types/pet";

interface AdoptButtonProps {
  pet: Pet;
  adopterId: string | null;
}

export const AdoptButton: React.FC<AdoptButtonProps> = async ({
  pet,
  adopterId,
}) => {
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
      // Check if a chat already exists for the given provider_id, adopter_id, and pet_id
      const { data: existingChat, error: existingChatError } = await supabase
        .from("chats")
        .select("id")
        .eq("adopter_id", adopterId)
        .eq("provider_id", pet.provider_user_id)
        .eq("pet_id", pet.pet_id)
        .single();

      if (existingChatError && existingChatError.code !== "PGRST116") {
        throw existingChatError;
      }

      if (existingChat) {
        // If a chat already exists, navigate to the existing chat
        router.push(`/messages/${existingChat.id}`);
      } else {
        // If a chat doesn't exist, create a new chat and message
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

          const { error: messageError } = await supabase
            .from("messages")
            .insert({
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
      }
    } catch (error) {
      console.error("Error adopting pet:", error);
      router.push("/error");
    }
  };
  const handleLoadChatsClick = () => {
    router.push(`/messages`);
  };

  const checkExistingChat = () => {
    if (!adopterId || !pet.provider_user_id || !pet.pet_id) {
      return null;
    }
  };
  if (pet.provider_user_id === adopterId) {
    return (
      <button
        onClick={handleLoadChatsClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
      >
        <span className="mr-2">Load Chats for {pet.name}</span>
        <span className="text-xl">&#x1f4ac;</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => adoptPet().catch(console.error)}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
    >
      <span className="mr-2">
        {checkExistingChat()
          ? `Go to chat with ${pet.name}`
          : `Adopt ${pet.name}`}
      </span>
      <span className="text-xl">&#x1f43e;</span>
    </button>
  );
};
