import { useQuery } from "@tanstack/react-query";
import { getAllExercisesFromDatabase } from "../services/apiTrainingFeatures";

export function useExercises() {
  const {
    data: exercises,
    isPending,
    error,
  } = useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      try {
        const data = await getAllExercisesFromDatabase();

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { exercises, isLoading: isPending, error };
}
