import React, { memo } from "react";
import Image from "next/image";
import { Pet } from "@/types/pet";
import PropTypes from "prop-types";

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = memo(({ pet }) => {
  const statusClasses = {
    available: "text-green-500 bg-green-100",
    unavailable: "text-gray-800 bg-gray-300",
  };

  const { available, unavailable } = statusClasses;
  const statusStyle =
    pet.status.toLowerCase() === "available" ? available : unavailable;

  return (
    <div className="rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105 border">
      <div className="relative h-64">
        {pet.photos?.length > 0 ? (
          <Image
            key={pet.pet_id}
            src={pet.photos[0]}
            alt={`Photo of ${pet.name}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-300">No Image Available</span>
          </div>
        )}
        <span
          className={`absolute top-2 left-2 rounded-full px-3 py-1 text-sm font-bold ${statusStyle}`}
        >
          {pet.status.toUpperCase()}
        </span>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{pet.name}</h2>
        <p className="mb-1">
          {pet.type} • {pet.breed}
        </p>
        <p className="mb-2">Age: {pet.age} years</p>
        <p className="line-clamp-2">{pet.description}</p>
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
    age: PropTypes.number.isRequired,
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
