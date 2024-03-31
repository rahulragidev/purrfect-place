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
  adopterId: string;
}

export const AdoptButton: React.FC<AdoptButtonProps> = ({ pet, adopterId }) => {
  const router = useRouter();

  const adoptPet = async () => {
    try {
      if (!pet.provider_user_id || !pet.pet_id) {
        throw new Error("Missing required pet properties");
      }

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

      console.log("Chat data:", chatData);

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
    <button onClick={() => handleAdoptClick().catch(console.error)}>
      Adopt {pet.name} <span className="ml-2">&#x1f43e;</span>
    </button>
  );
};

AdoptButton.propTypes = {
  pet: PropTypes.shape({
    pet_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
    ]).isRequired,
    status: PropTypes.oneOf(["available", "adopted"]).isRequired,
    provider_user_id: PropTypes.string.isRequired,
    adopter_user_id: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    created_at: PropTypes.instanceOf(Date).isRequired,
    updated_at: PropTypes.instanceOf(Date).isRequired,
    photos: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  adopterId: PropTypes.string.isRequired,
};
