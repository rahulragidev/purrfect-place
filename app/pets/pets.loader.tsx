import { supabase } from "@/utils/supabase/client";

export async function getPets() {
  const { data, error } = await supabase.from("pets").select("*");

  if (error) {
    console.error("Error fetching pets:", error.message);
    throw new Error("Failed to fetch pets");
  }
  console.log(data);
  return data;
}

export const fetchPetDetails = async (pet_id: string) => {
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
