import supabase from "../../../services/supabse";
import {
  PerformedExerciseInterface,
  PerformedSetsInterface,
  TrainingDayInterface,
  TrainingInstanceInterface,
  TrainingSplitInterface,
} from "../types/trainingEntities";

// Training Split entity

export async function getTrainingSplits(
  loggedUserId: string
): Promise<TrainingSplitInterface[]> {
  const { data: trainingSplits, error } = await supabase
    .from("training_splits")
    .select("*")
    .eq("user_id", loggedUserId);

  if (error) {
    console.log(error);
    throw new Error(
      "There was a error(getTainingSplits, apiTrainingFeatures.ts)"
    );
  }

  return trainingSplits as TrainingSplitInterface[];
}

export async function updateTrainingSplit(
  trainingSplitId: string,
  updateData: TrainingSplitInterface
): Promise<undefined> {
  const { error } = await supabase
    .from("training_splits")
    .update(updateData)
    .eq("id", trainingSplitId);

  if (error) {
    console.log(error);
    throw new Error(
      "There was a error (updateTrainingSplit, apiTrainingFeatures.ts)"
    );
  }

  return;
}

// Training day entity

export async function getTrainingDaysFromTrainingSplit(
  trainingSplitId: string
): Promise<TrainingDayInterface[]> {
  const { data, error } = await supabase
    .from("training_days")
    .select("*")
    .eq("training_split_id", trainingSplitId);

  if (error) {
    console.log(error);
    throw new Error(
      "There was a error (getTrainingDaysFromTrainingSplit, apiTrainingFeatures.ts)"
    );
  }

  return data;
}

export async function getTrainingDay(
  trainingDayId: string
): Promise<TrainingDayInterface> {
  const { data, error } = await supabase
    .from("training_days")
    .select("*")
    .eq("id", trainingDayId)
    .single();

  if (error) {
    console.log(error);
    throw new Error(
      "There was a error(getTrainingDay, apiTrainingFeatures.ts)"
    );
  }

  console.log(data);
  return data;
}

// Training instance entity

export async function getTrainingInstancesWithTrainingDayId(
  trainingDayId: string | undefined
): Promise<TrainingInstanceInterface[] | undefined> {
  if (!trainingDayId || trainingDayId === "") {
    console.log("Training day id is empty or undefined, id: ", trainingDayId);
    throw new Error("Training day id is empty or undfined");
  }

  const { data, error } = await supabase
    .from("training_instances")
    .select("*")
    .eq("training_day_id", trainingDayId);

  if (error) {
    console.log(error);
    throw new Error(
      "There was a error (getTrainingInstancesWithTrainingDayId, apiTrainingFeatures.ts)"
    );
  }

  return data as TrainingInstanceInterface[];
}

// Performed exercises entity

export async function getPerformedExercisesWithTrainingInstanceId(
  trainingInstanceId: string
): Promise<PerformedExerciseInterface[]> {
  if (!trainingInstanceId || trainingInstanceId === "") {
    console.log(
      "Training instance id is empty or undefined, id: ",
      trainingInstanceId
    );
    throw new Error("Training day instance id is empty or undefined");
  }

  const { data, error } = await supabase
    .from("performed_exercises")
    .select("*")
    .eq("training_instance_id", trainingInstanceId);

  if (error) {
    console.log(error);
    throw new Error(
      "There was a error(getPerformedExercisesWithTrainingInstanceId, apiTrainingFeatures.ts)"
    );
  }

  return data as PerformedExerciseInterface[];
}

// Performed sets entity

export async function getPerformedSetsFromPerformedExerciseId(
  performedExerciseId: string
): Promise<PerformedSetsInterface[]> {
  if (!performedExerciseId || performedExerciseId === "") {
    console.log(
      "Training instance id is empty or undefined, id: ",
      performedExerciseId
    );
    throw new Error("Training instance id is empty or undefined");
  }

  const { data, error } = await supabase
    .from("performed_sets")
    .select("*")
    .eq("performed_exercise_id", performedExerciseId);

  if (error) {
    console.log(error);
    throw new Error(
      "There was a error(getPerformedSetsFromPerformedExerciseId, apiTrainingFeatures.ts)"
    );
  }

  return data as PerformedSetsInterface[];
}
