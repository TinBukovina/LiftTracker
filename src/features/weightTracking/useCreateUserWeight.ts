import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../toasts/ToastContext";
import { createUserWieght } from "./apiWeightTracking";
import { CreateUserWeights } from "./weightTrackingEntitiesTypes";

export function useCreateUserWeight() {
  const { addNewToast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createUserWieghtData: CreateUserWeights) => {
      const createdEntity = await createUserWieght(createUserWieghtData);

      console.log(createdEntity);
      return createdEntity;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "weights",
      });

      addNewToast("Added weight successfully.", "positive");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
