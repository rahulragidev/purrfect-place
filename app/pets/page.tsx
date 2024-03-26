import React from "react";
import Link from "next/link";
import { getPets } from "./pets.loader";
import PetCard from "@/components/PetCard";

const Index = async () => {
  const pets = await getPets();

  return (
    <article className="flex flex-1 flex-col items-center gap-6 mt-6 w-full">
      <section className="container px-4 sm:px-0 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pets.map((pet) => (
            <Link href={`/pets/${pet.pet_id}`} key={pet.pet_id}>
              <PetCard pet={pet} key={pet.pet_id} />
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
};

export default Index;
