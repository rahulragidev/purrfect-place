// PetImageCarousel.client.jsx
"use client";
import React, { useState } from "react";

// Define a type for the component props
interface PetImageCarouselProps {
  photos: string[]; // Assuming photos is an array of strings (URLs)
}

const PetImageCarousel: React.FC<PetImageCarouselProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        <img
          key={index}
          src={photo}
          alt={`Image ${index + 1}`}
          className={`w-full h-full object-cover rounded-xl ${
            index === currentIndex ? "block" : "hidden"
          }`}
        />
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
