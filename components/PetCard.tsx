import React from "react";
import Image from "next/image";

interface Pet {
  id: number;
  name: string;
  age: number;
  type: string;
  breed: string;
  description: string;
  photos: string[];
}

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  return (
    <article className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition duration-500 ease-in-out transform hover:scale-105">
      <div className="relative h-48 w-full">
        {pet.photos && pet.photos.length > 0 ? (
          <Image
            src={pet.photos[0]}
            alt={`Photo of ${pet.name}`}
            layout="fill"
            objectFit="cover"
            className="transition duration-500 ease-in-out transform hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <span className="text-sm text-gray-500">No image available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 leading-tight">
          {pet.name}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {pet.type} <span className="font-semibold text-gray-600">•</span>{" "}
          {pet.breed} <span className="font-semibold text-gray-600">•</span>{" "}
          Age: {pet.age} years
        </p>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          {pet.description}
        </p>
      </div>
    </article>
  );
};

export default PetCard;
