export interface TrainingSplitInterface {
  id?: string;
  name?: string;
  created_at?: string;
  user_id?: string;
  weekly_frequency?: number;
  is_active?: boolean;
  description?: string;

  [key: string]: string | number | boolean | null | undefined;
}

export interface TrainingDayInterface {
  id: string;
  name: string;
  created_at: string;
  last_trained: string;
  day_order: number;
  notes: string;
  training_split_id: string;

  [key: string]: string | number | boolean | null | undefined;
}

export interface TrainingInstanceInterface {
  id: string;
  user_id: string;
  training_day_id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_completed: boolean;
  notes: string;
  rating: number;
}

export interface PerformedExerciseInterface {
  id: string;
  trainingInstanceId: string;
  exerciseId: string;
  name: string;
  plannedSets: number;
  planned_reps: number;
  is_completed: boolean;
  notes: string;
}
export interface PerformedExerciseOptionalInterface {
  id?: string;
  trainingInstanceId?: string;
  exerciseId?: string;
  name?: string;
  plannedSets?: number;
  planned_reps?: number;
  is_completed?: boolean;
  notes?: string;
}

export interface PerformedSetsInterface {
  id: string;
  performed_exercise_id: string;
  weight: number;
  reps: number;
  is_completed: boolean;
  notes: string;
}

export interface PerformedSetsOptionalInterface {
  id?: string;
  performed_exercise_id?: string;
  weight?: number;
  reps?: number;
  is_completed?: boolean;
  notes?: string;
}
