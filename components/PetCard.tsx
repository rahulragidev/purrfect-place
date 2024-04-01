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
    adopted: "text-gray-800 bg-gray-300",
  };

  const { available, adopted } = statusClasses;
  const statusStyle = pet.status === "available" ? available : adopted;

  return (
    <div className="rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105 border">
      <div className="relative h-64">
        {pet.photos && pet.photos.length > 0 ? (
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
          {pet.status?.toUpperCase()}
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
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
      .isRequired,
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
      .isRequired,
    breed: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
      .isRequired,
    age: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])])
      .isRequired,
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
    ]).isRequired,
    status: PropTypes.oneOf(["available", "adopted"]).isRequired,
    provider_user_id: PropTypes.string.isRequired,
    adopter_user_id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
    ]).isRequired,
    latitude: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])])
      .isRequired,
    longitude: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])])
      .isRequired,
    created_at: PropTypes.instanceOf(Date).isRequired,
    updated_at: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.oneOf([null]),
    ]).isRequired,
    photos: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string.isRequired),
      PropTypes.oneOf([null]),
    ]).isRequired,
    additional_info: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.oneOf([null]),
    ]).isRequired,
  }).isRequired,
};

PetCard.displayName = "PetCard";

export default PetCard;
