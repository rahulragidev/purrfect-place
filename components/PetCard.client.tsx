import React, { memo } from "react";
import Image from "next/image";
import { Pet } from "@/types/pet";

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        {pet.photos.length > 0 && (
          <Image
            src={pet.photos[0]}
            alt={`Photo of ${pet.name}`}
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 leading-tight">
          {pet.name}{" "}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {pet.type} • {pet.breed} • Age: {pet.age} years
        </p>
        <p className="text-sm text-gray-500 mt-1">{pet.status}</p>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          {pet.description}
        </p>
      </div>
    </div>
  );
};

export default memo(PetCard);
