import supabase from "../../../services/supabse";
import {
  CreatePerformedExerciseInterface,
  CreatePerformedSetsInterface,
  CreateTrainingDayExercisesInterface,
  CreateTrainingDayInterface,
  CreateTrainingInstanceInterface,
  CreateTrainingSplitInterface,
  ExerciseInterface,
  PerformedExerciseInterface,
  PerformedSetsInterface,
  TrainingDayExercisesInterface,
  TrainingDayInterface,
  TrainingInstanceInterface,
  TrainingSplitInterface,
} from "../types/trainingEntities";

// training_splits entity

export async function getTrainingSplits(
  loggedUserId: string
): Promise<TrainingSplitInterface[]> {
  const { data: trainingSplits, error } = await supabase
    .from("training_splits")
    .select("*")
    .eq("user_id", loggedUserId);

  if (error) {
    console.log(error);
    throw new Error(error.message);
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
    throw new Error(error.message);
  }

  return;
}

export async function createTrainingSplit(
  trainingSplitData: CreateTrainingSplitInterface
): Promise<TrainingSplitInterface> {
  const { data, error } = await supabase
    .from("training_splits")
    .insert([trainingSplitData])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as TrainingSplitInterface;
}

export async function deleteTrainingSplit(trainingSplitId: string) {
  console.log(trainingSplitId);
  const { error } = await supabase
    .from("training_splits")
    .delete()
    .eq("id", trainingSplitId);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return;
}

// training_days entity

export async function getTrainingDaysFromTrainingSplit(
  trainingSplitId: string
): Promise<TrainingDayInterface[]> {
  const { data, error } = await supabase
    .from("training_days")
    .select("*")
    .eq("training_split_id", trainingSplitId);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as TrainingDayInterface[];
}

export async function createTrainingDay(
  trainingDayData: CreateTrainingDayInterface
): Promise<TrainingDayInterface> {
  const { data, error } = await supabase
    .from("training_days")
    .insert([trainingDayData])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as TrainingDayInterface;
}

/* export async function getTrainingDay(
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
} */

// training_instances entity

export async function getTrainingInstancesWithTrainingDayId(
  trainingDayId: string | undefined
): Promise<TrainingInstanceInterface[] | undefined> {
  const { data, error } = await supabase
    .from("training_instances")
    .select("*")
    .eq("training_day_id", trainingDayId);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as TrainingInstanceInterface[];
}

export async function createTrainingInstance(
  trainingInstanceData: CreateTrainingInstanceInterface
): Promise<TrainingInstanceInterface> {
  const { data, error } = await supabase
    .from("training_instances")
    .insert([trainingInstanceData])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as TrainingInstanceInterface;
}

// performed_exercises entity

export async function getPerformedExercisesWithTrainingInstanceId(
  trainingInstanceId: string
): Promise<PerformedExerciseInterface[]> {
  const { data, error } = await supabase
    .from("performed_exercises")
    .select("*")
    .eq("training_instance_id", trainingInstanceId);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as PerformedExerciseInterface[];
}

export async function createPerformedExercise(
  performedExerciseData: CreatePerformedExerciseInterface
): Promise<PerformedExerciseInterface> {
  const { data, error } = await supabase
    .from("performed_exercises")
    .insert([performedExerciseData])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as PerformedExerciseInterface;
}

// performed_sets entity

export async function getPerformedSetsFromPerformedExerciseId(
  performedExerciseId: string
): Promise<PerformedSetsInterface[]> {
  const { data, error } = await supabase
    .from("performed_sets")
    .select("*")
    .eq("performed_exercise_id", performedExerciseId);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as PerformedSetsInterface[];
}

export async function createPerformedSet(
  perforemdSetsData: CreatePerformedSetsInterface
): Promise<PerformedSetsInterface> {
  const { data, error } = await supabase
    .from("performed_sets")
    .insert([perforemdSetsData])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as PerformedSetsInterface;
}

// training_day_exercises entity

export async function getExercisesFromTrainingDay(
  trainingDayId: string
): Promise<TrainingDayExercisesInterface[]> {
  const { data, error } = await supabase
    .from("training_day_exercises")
    .select("*")
    .eq("training_day_id", trainingDayId);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as TrainingDayExercisesInterface[];
}

export async function createTrainingDayExercise(
  trainingDayExerciseData: CreateTrainingDayExercisesInterface
): Promise<TrainingDayExercisesInterface> {
  const { data, error } = await supabase
    .from("training_day_exercises")
    .insert([trainingDayExerciseData])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as TrainingDayExercisesInterface;
}

// exercises entity

export async function getExercise(
  exerciseId: string
): Promise<ExerciseInterface> {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("id", exerciseId)
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as ExerciseInterface;
}

export async function getAllExercisesFromDatabase(): Promise<
  ExerciseInterface[]
> {
  const { data, error } = await supabase.from("exercises").select("*");

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data as ExerciseInterface[];
}
