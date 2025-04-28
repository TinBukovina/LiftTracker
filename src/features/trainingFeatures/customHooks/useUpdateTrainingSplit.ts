import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrainingSplitInterface } from "../types/trainingEntities";
import { updateTrainingSplit } from "../services/apiTrainingFeatures";

export function useUpdateTrainingSplit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      trainingSplitId,
      updateData,
    }: {
      trainingSplitId: string;
      updateData: TrainingSplitInterface;
    }) => {
      return updateTrainingSplit(trainingSplitId, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainingSplits"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
