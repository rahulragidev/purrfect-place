import React, { memo } from "react";
import Image from "next/image";
import { Pet } from "@/types/pet";

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const statusColor =
    pet.status.toLowerCase() === "available"
      ? "text-green-500 bg-green-100"
      : "text-gray-800 bg-gray-300";
  const statusBorderColor =
    pet.status.toLowerCase() === "available"
      ? "border-green-500"
      : "border-gray-400";

  const cardSize = "w-96 h-96";

  return (
    <div
      className={`relative  mx-auto overflow-hidden rounded-lg border border-gray-700 bg-black shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-400 ${cardSize}`}
    >
      <div className="relative overflow-hidden rounded-t-lg h-1/2">
        {pet.photos.length > 0 ? (
          <Image
            src={pet.photos[0]}
            alt={`Photo of ${pet.name}`}
            layout="fill"
            objectFit="cover"
            priority
            className="rounded-t-lg"
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-200 rounded-t-lg h-full">
            <span>No Image Available</span>
          </div>
        )}
        <span
          className={`absolute top-0 left-0 ml-4 mt-4 rounded-full px-3 py-1 text-xs font-semibold ${statusColor} border ${statusBorderColor}`}
        >
          {pet.status.toUpperCase()}
        </span>
      </div>

      <div className="px-4 py-4 h-3/5 overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {pet.name}
        </h2>
        <p className="mt-1 text-sm text-gray-500 truncate">
          {pet.type} • {pet.breed}
        </p>
        <p className="text-sm text-gray-500">Age: {pet.age} years</p>
        <p className="mt-2 text-sm text-gray-600 overflow-hidden text-ellipsis leading-tight">
          {pet.description}
        </p>
      </div>
    </div>
  );
};

export default memo(PetCard);
