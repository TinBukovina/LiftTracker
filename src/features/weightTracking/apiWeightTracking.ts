import supabase from "../../services/supabse";
import { CreateUserWeights, UserWeights } from "./weightTrackingEntitiesTypes";

// user_weights entityies

export async function getUserWeightsWithUserId(
  userId: string
): Promise<UserWeights[]> {
  const { data, error } = await supabase
    .from("user_weights")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  console.log(data);

  return data as UserWeights[];
}

export async function createUserWieght(
  userWightData: CreateUserWeights
): Promise<UserWeights> {
  const { data, error } = await supabase
    .from("user_weights")
    .insert([userWightData])
    .select("*")
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as UserWeights;
}
