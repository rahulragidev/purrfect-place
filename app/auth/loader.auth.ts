import { createClient } from "@/utils/supabase/server";

  export const userId = async (): Promise<string> => {
    "use server";
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error("Error fetching user: " + error.message);
    }
    if (!data.user || !data.user.id) {
      throw new Error("User ID is undefined");
    }
    return data.user.id;
  };