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
    queryKey: ["trainingSplits"],
    queryFn: () => getTrainingSplits(loggedUserId),
  });

  return {
    isLoading: isPending,
    trainingSplits,
    error: error as Error | null,
  };
}
