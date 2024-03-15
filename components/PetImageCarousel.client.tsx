"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface PetImageCarouselProps {
  photos: string[];
}

const PetImageCarousel: React.FC<PetImageCarouselProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [photos]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={photo}
            alt={`Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      ))}
      <button
        onClick={handlePrev}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 transition-opacity duration-300 ease-in-out"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        aria-label="Next image"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 transition-opacity duration-300 ease-in-out"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default PetImageCarousel;
