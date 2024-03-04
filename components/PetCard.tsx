import React from "react";
import Image from "next/image";

// Define the structure of a pet object
interface Pet {
  id: number;
  name: string;
  age: number;
  type: string;
  breed: string;
  description: string;
  photos: string[]; // Assuming photos is an array of string URLs
}

// Props for the PetCard component
interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4 bg-white border border-gray-200">
      <div className="h-48 w-full relative mb-4">
        {pet.photos && pet.photos.length > 0 && (
          <Image
            src={pet.photos[0]}
            alt={`Photo of ${pet.name}`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        )}
      </div>
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800">{pet.name}</h2>
        <p className="text-gray-600 text-sm mb-2">
          {pet.type} - {pet.breed}
        </p>
        <p className="text-gray-600 text-sm">Age: {pet.age} years</p>
        <p className="text-gray-600 text-sm mt-4">{pet.description}</p>
      </div>
    </div>
  );
};

export default PetCard;
