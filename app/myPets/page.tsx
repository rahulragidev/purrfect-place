import React from "react";
import PetCard from "@/components/PetCard";
import { Pet } from "@/types/pet";
import { fetchCurrentUserData } from "@/utils/users/fetchCurrentUserData";
import { fetchUserPets } from "@/utils/pets/fetchUserPets";

export default async function PetsPage() {
  const user = await fetchCurrentUserData();
  const user_id = user?.id ?? "";
  const pets = await fetchUserPets(user_id);

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
