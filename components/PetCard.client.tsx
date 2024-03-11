"use client";

import React, { useState } from "react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === pet.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? pet.photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <article className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition duration-500 ease-in-out transform hover:scale-105 relative">
      <div className="relative h-48 w-full">
        {pet.photos.length > 0 && (
          <div>
            <Image
              src={pet.photos[currentImageIndex]}
              alt={`Photo of ${pet.name}`}
              layout="fill"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        )}
        {pet.photos.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
            >
              &#60;
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
            >
              &#62;
            </button>
          </>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 leading-tight">
          {pet.name}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {pet.type} • {pet.breed} • Age: {pet.age} years
        </p>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          {pet.description}
        </p>
      </div>
    </article>
  );
};

export default PetCard;
