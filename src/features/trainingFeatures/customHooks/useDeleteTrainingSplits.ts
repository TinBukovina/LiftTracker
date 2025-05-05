// useDeleteTrainingSplit.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTrainingSplit } from "../services/apiTrainingFeatures";

export const useDeleteTrainingSplit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (trainingSplitId: string) => {
      await deleteTrainingSplit(trainingSplitId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] !== "user",
      });

      console.log("successfuly deleted training split");
    },

    onError: (error) => {
      console.log(error);
    },
  });
};
