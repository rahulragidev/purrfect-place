import React from "react";
import PetCard from "@/components/PetCard";
import { Pet } from "@/types/pet";
import { getMyPets } from "../pets/pets.loader";
import { supabase } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";

export default async function PetsPage() {
  const userId = async () => {
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

  const stringUserId = await userId();
  const pets = await getMyPets(stringUserId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {pets.map((pet: Pet) => (
        <PetCard key={pet.pet_id} pet={pet} />
      ))}
    </div>
  );
}
