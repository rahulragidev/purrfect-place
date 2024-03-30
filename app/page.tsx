import Link from "next/link";
import PetCard from "@/components/PetCard";
import React from "react";
import { getPets } from "./pets/pets.loader";

const IndexPage = async () => {
  const pets = await getPets();
  return (
    <div className="min-h-screen">
      <header className="hero p-12 text-center">
        <h1 className="text-4xl font-bold">Find Your Perfect Pet Companion</h1>
        <p className="mt-3 max-w-2xl mx-auto">
          Join our community dedicated to connecting pets in need with loving
          families. Discover how you can make a difference today.
        </p>
      </header>

      <section className="mission py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold  mb-4">Our Mission</h2>
          <p>
            We believe every pet deserves a loving home. Our mission is to
            streamline the adoption process, making it easier for you to find
            your new best friend.
          </p>
        </div>
      </section>

      <section className="how-it-works py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <ul className="space-y-4">
            <li>1. Browse available pets / Provide pets for adoption</li>
            <li>
              2. Learn about each pett&apos;s story, needs, and personality.
            </li>
            <li>
              3. Apply to adopt and connect with the pett&apos;s current
              caretaker.
            </li>
          </ul>
        </div>
      </section>

      <section className="featured-pets px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center space-x-2">
            <span>🐾</span>
            <span>Featured Pets</span>
            <span className="inline-block relative">
              <span className="text-transparent">Pets</span>
              <span className="absolute top-0 left-0 flex items-center justify-center space-x-1">
                <span> 🐶 </span>
                <span> 😺 </span>
                <span> 🐦 </span>
              </span>
            </span>
            <span> 🐾 </span>
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pets.map((pet) => (
              <Link href={`/pets/${pet.pet_id}`} key={pet.pet_id}>
                <PetCard pet={pet} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
