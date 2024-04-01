import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const userId = async (): Promise<string> => {
  "use server";
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      if (error.message.includes("Invalid Refresh Token")) {
        redirect("/login");
      } else {
        throw new Error("Error fetching user: " + error.message);
      }
    }

    if (!data.user || !data.user.id) {
      throw new Error("User ID is undefined");
    }

    return data.user.id;
  } catch (error) {
    console.error("Error in userId function:", error);
    redirect("/login");
  }
};