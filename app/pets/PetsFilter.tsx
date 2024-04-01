"use client";

import React, { useState } from "react";
import Link from "next/link";
import PetCard from "@/components/PetCard";
import { Pet } from "@/types/pet";

interface PetsFilterProps {
  pets: Pet[];
}

const PetsFilter: React.FC<PetsFilterProps> = ({ pets }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredPets = pets.filter((pet) => {
    const matchesSearchTerm =
      !searchTerm ||
      pet?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet?.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet?.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilterType =
      !filterType || pet?.type?.toLowerCase() === filterType.toLowerCase();

    const matchesFilterStatus =
      !filterStatus ||
      (pet.status !== null &&
        pet.status.toLowerCase() === filterStatus.toLowerCase());

    return matchesSearchTerm && matchesFilterType && matchesFilterStatus;
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div className="container px-4 sm:px-0 mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search pets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-auto"
          />
          <button
            onClick={() => setFilterType("dog")}
            className={`px-4 py-2 rounded-md transition-colors duration-300 ${
              filterType === "dog"
                ? "bg-blue-500 text-black"
                : "bg-white text-black border border-gray-300"
            }`}
          >
            Dogs
          </button>
          <button
            onClick={() => setFilterType("cat")}
            className={`px-4 py-2 rounded-md transition-colors duration-300 ${
              filterType === "cat"
                ? "bg-blue-500 text-black"
                : "bg-white text-black border border-gray-300"
            }`}
          >
            Cats
          </button>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 text-black rounded-md px-4 py-2"
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="adopted">Adopted</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPets.map((pet) => (
            <Link href={`/pets/${pet.pet_id}`} key={pet.pet_id}>
              <PetCard pet={pet} key={pet.pet_id} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetsFilter;
