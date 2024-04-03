"use client";
import React, { useState } from "react";
import Link from "next/link";
import PetCard from "@/components/PetCard";
import { Pet } from "@/types/pet";
import { FaSearch, FaDog, FaCat } from "react-icons/fa";

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
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="container px-4 sm:px-0 mx-auto py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search pets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => setFilterType("dog")}
            className={`px-6 py-2 rounded-full flex items-center transition-colors duration-300 ${
              filterType === "dog"
                ? "bg-blue-500"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FaDog className="mr-2" />
            Dogs
          </button>
          <button
            onClick={() => setFilterType("cat")}
            className={`px-6 py-2 rounded-full flex items-center transition-colors duration-300 ${
              filterType === "cat"
                ? "bg-blue-500"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FaCat className="mr-2" />
            Cats
          </button>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="adopted">Adopted</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPets.map((pet) => (
            <Link href={`/pets/${pet.pet_id}`} key={pet.pet_id}>
              <PetCard pet={pet} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetsFilter;
