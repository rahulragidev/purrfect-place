import PetCard from "@/components/PetCard.client";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";

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
    <div className="flex-1 w-full flex flex-col gap-6 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="font-black text-2xl text-cyan-500">PawMingle</div>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <div className="m-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-slate-100">
          {pets.map((pet) => (
            <Link href={`/${pet.pet_id}`}>
              <PetCard key={pet.id} pet={pet} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
