import PetCard from "@/components/PetCard.client";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";

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

  const samplePet = {
    id: 1,
    name: "Buddy",
    age: 3,
    type: "Dog",
    breed: "Golden Retriever",
    description: "A friendly and energetic dog looking for a loving home.",
    photos: ["/images/buddy.jpg", "/images/buddy2.jpeg"],
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="font-black text-2xl text-cyan-500">PawMingle</div>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      <div className="text-slate-100 m-20">
        <PetCard pet={samplePet} />
      </div>
    </div>
  );
}
