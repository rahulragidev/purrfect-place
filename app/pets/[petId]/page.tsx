import React from "react";
import { fetchPetDetails } from "@/utils/pets/fetchPetDetails";
import PetImageCarousel from "@/components/PetImageCarousel.client";
import { PageParams } from "@/types/pageParams";
import { AdoptButton } from "@/components/AdoptButton";
import { fetchCurrentUserData } from "@/utils/users/fetchCurrentUserData";

export default async function Page({ params }: PageParams) {
  const petDetails = await fetchPetDetails(params.petId);
  const pet = petDetails[0];

  let adopterId: string | null = null;
  try {
    const user = await fetchCurrentUserData();
    adopterId = user?.id ?? "";
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
        <PetImageCarousel key={pet.pet_id} photos={pet.photos} />
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold">{pet.name}</h1>
            <AdoptButton pet={pet} adopterId={adopterId} />
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <p className="col-span-1">
              <span className="font-semibold">Age:</span> {pet.age} years
            </p>
            <p className="col-span-1">
              <span className="font-semibold">Type:</span> {pet.type}
            </p>
            <p className="col-span-1">
              <span className="font-semibold">Breed:</span> {pet.breed}
            </p>
            <p className="col-span-1">
              <span className="font-semibold">Status:</span> {pet.status}
            </p>
            <p className="col-span-2">
              <span className="font-semibold">Added on:</span>{" "}
              {new Date(pet.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2">Description</h2>
            <p className="text-md">{pet.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
