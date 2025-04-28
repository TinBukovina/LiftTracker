import { useQuery } from "@tanstack/react-query";
import { getTrainingDaysFromTrainingSplit } from "../services/apiTrainingFeatures";

export function useTrainingDays(trainingSplitId: string) {
  const {
    data: trainingDays,
    isPending,
    error,
  } = useQuery({
    queryKey: ["trainingDays", trainingSplitId],
    queryFn: () => getTrainingDaysFromTrainingSplit(trainingSplitId),
  });

  return { trainingDays, isLoading: isPending, error };
}
