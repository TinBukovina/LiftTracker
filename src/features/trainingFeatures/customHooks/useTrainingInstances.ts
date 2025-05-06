import { useQuery } from "@tanstack/react-query";
import {
  getPerformedExercisesWithTrainingInstanceId,
  getPerformedSetsFromPerformedExerciseId,
  getTrainingInstancesWithTrainingDayId,
} from "../services/apiTrainingFeatures";
import { PerformedSetsOptionalInterface } from "../types/trainingEntities";

export interface TrainingInstsanceCustomInterface {
  name: string;
  data: PerformedSetsOptionalInterface[];
}

export interface UseTrainingInstanceReturnData {
  date: string;
  exercises: TrainingInstsanceCustomInterface[];
}

export function useTrainingInstance(trainingDayId: string | undefined) {
  const {
    data: trainingInstances,
    isPending,
    error,
  } = useQuery({
    queryKey: ["trainingInstances", trainingDayId],
    queryFn: async (): Promise<UseTrainingInstanceReturnData[]> => {
      const trainingInstanceData = [];

      const trainingInstances =
        await getTrainingInstancesWithTrainingDayId(trainingDayId);

      if (!trainingInstances) {
        return [];
      }

      if (trainingInstances?.length <= 0) {
        console.log("There is no training instance in this day");
        return [];
      }

      for (const instance of trainingInstances) {
        const preformedExercises =
          await getPerformedExercisesWithTrainingInstanceId(instance.id);

        const data = {
          date: instance.date,
          exercises: [] as TrainingInstsanceCustomInterface[],
        };

        for (const exePerfomance of preformedExercises) {
          const perforemdSets = await getPerformedSetsFromPerformedExerciseId(
            exePerfomance.id
          );

          data.exercises.push({
            name: exePerfomance.name,
            data: perforemdSets,
          });
        }

        trainingInstanceData.push(data);
      }

      return trainingInstanceData as UseTrainingInstanceReturnData[];
    },
    enabled: !!trainingDayId,
    refetchOnWindowFocus: true,
  });

  return { trainingInstances, isLoading: isPending, error };
}
