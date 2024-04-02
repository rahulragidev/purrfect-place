import { Pet } from "@/types/pet";
import { createClient } from "@/utils/supabase/server";

export const fetchPetDetails = async (pet_id: string): Promise<Pet[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("pet_id", pet_id);

  if (error) {
    console.error("Error fetching pet details:", error.message);
    throw new Error("Failed to fetch pet details");
  }
  return data;
};
