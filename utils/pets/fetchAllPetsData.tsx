import { Pet } from "@/types/pet";
import { createClient } from "@/utils/supabase/server";

export async function fetchAllPetsData(): Promise<Pet[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("pets").select("*");

  if (error) {
    console.error("Error fetching pets:", error.message);
    throw new Error("Failed to fetch pets");
  }
  console.log(data);
  return data;
}
