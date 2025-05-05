import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../toasts/ToastContext";
import { CreateTrainingSplitInputDataInterface } from "../modules/CreateTrainingSplitModule";
import {
  createTrainingDay,
  createTrainingDayExercise,
  createTrainingSplit,
} from "../services/apiTrainingFeatures";

export function useCreateTrainingSplit() {
  const navigate = useNavigate();
  const { addNewToast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      userId,
    }: {
      data: CreateTrainingSplitInputDataInterface;
      userId: string;
    }) => {
      // 1. Create instance in training_splits table
      const createdTrainingSplit = await createTrainingSplit({
        user_id: userId,
        name: data.name,
        weekly_frequency: data.trainingDays.length,
        description: data.description,
        is_active: true,
        created_at: new Date().toISOString(),
      });

      if (!createdTrainingSplit.id) return;

      // 2. Create instance in training_days table for every day in newly created training split
      for (const trainingDayData of data.trainingDays) {
        const createdTrainingDay = await createTrainingDay({
          name: trainingDayData.name,
          training_split_id: createdTrainingSplit.id,
          day_order: trainingDayData.dayOrder,
          notes: "",
          created_at: new Date().toISOString(),
          last_trained: null,
        });

        // 3. Create instance in training_day_exercises for every day in newly created training split
        for (const exerciseData of trainingDayData.exercises) {
          await createTrainingDayExercise({
            training_day_id: createdTrainingDay.id,
            exercise_id: exerciseData.id,
          });
        }
      }

      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] !== "user",
      });

      addNewToast("Training split successfully created.", "positive");
      navigate("/trainingSplits");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
