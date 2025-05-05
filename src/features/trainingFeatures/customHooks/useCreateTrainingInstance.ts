import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPerformedExercise,
  createPerformedSet,
  createTrainingInstance,
} from "../services/apiTrainingFeatures";
import {
  CreatePerformedExerciseInterface,
  CreatePerformedSetsInterface,
  CreateTrainingInstanceInterface,
} from "../types/trainingEntities";
import { InputDataInterface } from "../modules/TrainingDayModule";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../toasts/ToastContext";

export function useCreateTrainingInstance() {
  const navigate = useNavigate();
  const { addNewToast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      trainingInstanceData,
      performedExercisesAndSets,
    }: {
      trainingInstanceData: CreateTrainingInstanceInterface;
      performedExercisesAndSets: InputDataInterface[];
    }) => {
      const createdTrainingInstance =
        await createTrainingInstance(trainingInstanceData);

      for (const exercise of performedExercisesAndSets) {
        const performedExerciseData: CreatePerformedExerciseInterface = {
          training_instance_id: createdTrainingInstance.id,
          exercise_id: exercise.id || "",
          name: exercise.exercise,
          planned_sets: 0,
          planned_reps: 0,
          is_completed: true,
          notes: "",
        };

        const createdPerformedExercise = await createPerformedExercise(
          performedExerciseData
        );

        for (const set of exercise.values) {
          const performedSetData: CreatePerformedSetsInterface = {
            performed_exercise_id: createdPerformedExercise.id,
            weight: Number(set.val1),
            reps: Number(set.val2),
            is_completed: true,
            notes: "",
            set_order: set.index,
          };

          await createPerformedSet(performedSetData);
        }
      }

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] !== "user",
      });

      return;
    },
    onSuccess: () => {
      addNewToast("Training successfully finished.", "positive");
      navigate("/trainingSplits");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
