import { AuthResponse } from "@supabase/supabase-js";
import supabase from "../../../services/supabse";
import { AuthResponseInterface } from "../types/userEntity";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponseInterface> {
  const { data, error }: AuthResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    throw new Error("There was a error while running login, apiAuth");
  }

  console.log("DATATATATATA", data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    throw new Error("There was a error while running geteCurrentUser, apiAuth");
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    throw new Error("There was a error while running logout, authApi");
  }
}

export async function signup({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.log(error);
    throw new Error("There was a error while running signup, apiAuth");
  }

  return data;
}

/* export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: {
  password: string;
  fullName: string;
  avatar: string;
}) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.log(error);
    throw new Error(
      "There was a error while running updateCurrentUser, apiAuth"
    );
  }

  return data;

  // 2. Upload the avatar image

  // 3. Update avatar in the user
}
 */
