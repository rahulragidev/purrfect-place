import { supabase } from "@/utils/supabase/client";

export const fetchUserDetails = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("This is : " + user);
};
