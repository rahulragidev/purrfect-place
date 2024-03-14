import Link from "next/link";
import { getPets } from "./pets.loader";
import PetCard from "@/components/PetCard";

export default async function Index() {
  const pets = await getPets();
  return (
    <article className="flex-1 w-full flex flex-col gap-6 items-center mt-6">
      <div className="m-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-slate-100">
          {pets.map((pet) => (
            <Link href={`/pets/${pet.pet_id}`} key={pet.id}>
              <PetCard pet={pet} />
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
