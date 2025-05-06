import { useQuery } from "@tanstack/react-query";
import { useLoggedUserInfo } from "../authentification/context/LoggedUserContext";
import { getUserWeightsWithUserId } from "./apiWeightTracking";

export function useUserWeights() {
  const { loggedUserId } = useLoggedUserInfo();

  const { data: userWeights, isPending } = useQuery({
    queryKey: ["weights", loggedUserId],
    queryFn: async () => {
      try {
        console.log(loggedUserId);
        const data = await getUserWeightsWithUserId(loggedUserId);

        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!loggedUserId,
    retry: false,
  });

  return { userWeights, isLoading: isPending };
}
