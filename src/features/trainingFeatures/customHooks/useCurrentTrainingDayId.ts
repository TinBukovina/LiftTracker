import { useParams } from "react-router-dom";
import { useTrainingDays } from "./useTrainingDays";
import { unSlugifyName } from "../../../utils/helperFunction";
import { useEffect, useState } from "react";

export function useCurrentTrainingDayId() {
  const { id, trainingDayName } = useParams();
  const { trainingDays, isLoading, error } = useTrainingDays(id!);
  const [currentTrainingDayId, setCurrentTrainingDayId] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!isLoading && trainingDays) {
      const choosenTrainingDay = trainingDays
        .filter(
          (el) =>
            el.name.toLocaleLowerCase() === unSlugifyName(trainingDayName!)
        )
        .at(0);

      setCurrentTrainingDayId(choosenTrainingDay?.id || null);
    }
  }, [isLoading, trainingDays, trainingDayName]);

  return {
    currentTrainingDayId,
    isLoading,
    error,
  };
}
