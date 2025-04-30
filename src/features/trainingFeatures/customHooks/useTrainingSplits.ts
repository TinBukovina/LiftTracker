import { useLoggedUserInfo } from "../../authentification/context/LoggedUserContext";
import { useQuery } from "@tanstack/react-query";
import { getTrainingSplits } from "../services/apiTrainingFeatures";
import { TrainingSplitInterface } from "../types/trainingEntities";

export function useTrainingSplits() {
  const { loggedUserId } = useLoggedUserInfo();

  const { data: trainingSplits, isPending } = useQuery<
    TrainingSplitInterface[]
  >({
    queryKey: ["trainingSplits", loggedUserId],
    queryFn: async (): Promise<TrainingSplitInterface[]> => {
      try {
        const response = await getTrainingSplits(loggedUserId);

        return response as TrainingSplitInterface[];
      } catch (error) {
        console.log(error);

        return [];
      }
    },
    enabled: !!loggedUserId,
    refetchOnWindowFocus: true,
  });

  return {
    isLoading: isPending,
    trainingSplits,
  };
}
