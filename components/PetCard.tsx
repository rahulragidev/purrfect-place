// PetCard.js
import React, { memo } from "react";
import Image from "next/image";
import { Pet } from "@/types/pet";
import PropTypes from "prop-types";

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = memo(({ pet }) => {
  const statusClasses = {
    available: "text-green-500 bg-green-100 border-green-500",
    unavailable: "text-gray-800 bg-gray-300 border-gray-400",
  };

  const { available, unavailable } = statusClasses;
  const statusStyle =
    pet.status.toLowerCase() === "available" ? available : unavailable;

  return (
    <div className="flex flex-col mx-auto rounded-lg border bg-background  shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 w-full">
        {pet.photos?.length > 0 ? (
          <Image
            key={pet.pet_id}
            src={pet.photos[0]}
            alt={`Photo of ${pet.name}`}
            fill
            className="object-cover rounded-t-lg"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span>No Image Available</span>
          </div>
        )}
        <span
          className={`absolute top-2 left-2 rounded-full px-3 py-1 text-xs font-semibold border ${statusStyle}`}
        >
          {pet.status.toUpperCase()}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-lg font-bold truncate line-clamp-1">{pet.name}</h2>
        <p className="mt-1  truncate line-clamp-1">
          {pet.type} • {pet.breed}
        </p>
        <p className=" line-clamp-1">Age: {pet.age} years</p>
        <p className="mt-2 text-sm  overflow-hidden text-ellipsis leading-tight line-clamp-1">
          {pet.description}
        </p>
      </div>
    </div>
  );
});

PetCard.propTypes = {
  pet: PropTypes.shape({
    pet_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired, // Allows number or undefined
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
};

PetCard.displayName = "PetCard";
export default PetCard;
