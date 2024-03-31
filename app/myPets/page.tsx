import React from "react";
import PetCard from "@/components/PetCard";
import { Pet } from "@/types/pet";
import { getMyPets } from "../pets/pets.loader";
import { userId } from "../auth/loader.auth";

export default async function PetsPage() {
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
