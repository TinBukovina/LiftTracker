import { useLoggedUserInfo } from "../../authentification/context/LoggedUserContext";
import { useQuery } from "@tanstack/react-query";
import { getTrainingSplits } from "../services/apiTrainingFeatures";
import { TrainingSplitInterface } from "../types/trainingEntities";

export function useTrainingSplits() {
  const { loggedUserId } = useLoggedUserInfo();

  const {
    data: trainingSplits,
    isPending,
    error,
  } = useQuery<TrainingSplitInterface[]>({
    queryKey: ["trainingSplits", loggedUserId],
    queryFn: () => getTrainingSplits(loggedUserId),
    enabled: !!loggedUserId,
    refetchOnWindowFocus: true,
  });

  return {
    isLoading: isPending,
    trainingSplits,
    error: error as Error | null,
  };
}
