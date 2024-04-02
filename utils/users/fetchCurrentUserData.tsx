import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";

export const fetchCurrentUserData = async (): Promise<User | null> => {
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

    const user = data.user;

    if (!user || !user.id) {
      throw new Error("User ID is undefined");
    }

    return user;
  } catch (error) {
    console.error("Error in userId function:", error);
    redirect("/login");
    return null;
  }
};
