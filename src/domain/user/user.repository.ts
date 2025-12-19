import { getSupabaseServerClient } from "@/utils/supabase/server";

export async function findUserByEmail(email: string) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createUser(input: {
  email: string;
  firstName: string;
  lastName: string;
}) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("user")
    .insert({
      email: input.email,
      first_name: input.firstName,
      last_name: input.lastName,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
