import PetCard from "@/components/PetCard.client";
import { createClient } from "@/utils/supabase/server";
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";
import Navbar from "@/components/NavBar";

export async function getPets() {
  const { data, error } = await supabase.from("pets").select("*");

  if (error) {
    console.error("Error fetching pets:", error.message);
    throw new Error("Failed to fetch pets");
  }
  console.log(data);
  return data;
}

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  const pets = await getPets();
  return (
    <article className="flex-1 w-full flex flex-col gap-6 items-center">
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
