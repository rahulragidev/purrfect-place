import { createClient } from "@/utils/supabase/server";

export default async function Profile() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(data.user?.email);

  return <p>Hello</p>;
}
