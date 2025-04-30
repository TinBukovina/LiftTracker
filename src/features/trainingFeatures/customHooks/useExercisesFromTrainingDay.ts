import { useQuery } from "@tanstack/react-query";
import {
  getExercise,
  getExercisesFromTrainingDay,
} from "../services/apiTrainingFeatures";
import {
  ExerciseInterface,
  TrainingDayExercisesInterface,
} from "../types/trainingEntities";

export function useExercisesFromTrainingDay(trainingDayId: string) {
  const { data: exerciseFromTrainingDay, isPending } = useQuery<
    ExerciseInterface[]
  >({
    queryKey: ["trainingDayExercise", trainingDayId],
    queryFn: async (): Promise<ExerciseInterface[]> => {
      try {
        const data = [];

        const exercisesInTariningDay: TrainingDayExercisesInterface[] =
          await getExercisesFromTrainingDay(trainingDayId);

        for (const exerciseObj of exercisesInTariningDay) {
          const exercise = await getExercise(exerciseObj.exercise_id);

          data.push(exercise);
        }

        return data as ExerciseInterface[];
      } catch (error) {
        console.log(error);

        return [];
      }
    },
    enabled: !!trainingDayId,
    refetchOnWindowFocus: true,
  });

  return {
    isLoading: isPending,
    exerciseFromTrainingDay,
  };
}
