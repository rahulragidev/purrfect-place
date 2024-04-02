import { createClient } from "@/utils/supabase/server";

export async function fetchUserPets(userId: string) {
  const supabase = createClient();
  console.log("Hello" + userId);
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("provider_user_id", userId);
  if (error) {
    console.error("Error fetching myPets:", error.message);
    throw new Error("Failed to fetch myPets");
  }
  console.log(data);
  return data;
}
