import React from "react";
import PetCard from "@/components/PetCard";
import { Pet } from "@/types/pet";
import { getMyPets } from "../pets/pets.loader";
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
    <div>
      <h1 className="flex font-black text-gray-200 text-3xl p-6">My Pets</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full pt-6">
        {pets.map((pet: Pet) => (
          <PetCard key={pet.pet_id} pet={pet} />
        ))}
      </div>
    </div>
  );
}
