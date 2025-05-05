// Training split type

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

export interface CreateTrainingSplitInterface {
  name: string;
  created_at: string;
  user_id: string;
  weekly_frequency: number;
  is_active: boolean;
  description: string;
}

// Training day type

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

export interface CreateTrainingDayInterface {
  name: string;
  created_at: string;
  last_trained: string | null;
  day_order: number;
  notes: string;
  training_split_id: string;
}

// Training instance type

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
export interface CreateTrainingInstanceInterface {
  user_id: string;
  training_day_id: string;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
  is_completed: boolean;
  notes: string;
  rating: number;
}

// Performed exercise type

export interface PerformedExerciseInterface {
  id: string;
  training_instance_id: string;
  exercise_id: string;
  name: string;
  plannedSets: number;
  planned_sets: number;
  is_completed: boolean;
  notes: string;
}
export interface PerformedExerciseOptionalInterface {
  id?: string;
  training_instance_id?: string;
  exercise_id?: string;
  name?: string;
  planned_sets?: number;
  planned_reps?: number;
  is_completed?: boolean;
  notes?: string;
}
export interface CreatePerformedExerciseInterface {
  training_instance_id: string;
  exercise_id: string;
  name: string;
  planned_sets: number;
  planned_reps: number;
  is_completed: boolean;
  notes: string;
}

// Performed sets type

export interface PerformedSetsInterface {
  id: string;
  performed_exercise_id: string;
  weight: number;
  reps: number;
  is_completed: boolean;
  notes: string;
  set_order: number;
}

export interface PerformedSetsOptionalInterface {
  id?: string;
  performed_exercise_id?: string;
  weight?: number;
  reps?: number;
  is_completed?: boolean;
  notes?: string;
  set_order?: number;
}

export interface CreatePerformedSetsInterface {
  performed_exercise_id: string;
  weight: number;
  reps: number;
  is_completed: boolean;
  notes: string;
  set_order: number;
}

// Training day exercises type

export interface TrainingDayExercisesInterface {
  id: string;
  training_day_id: string;
  exercise_id: string;
}

export interface CreateTrainingDayExercisesInterface {
  training_day_id: string;
  exercise_id: string;
}

// Exercise type
export interface ExerciseInterface {
  id: string;
  name: string;
  reps_per_set: string;
  rest_time: string;
  notes: string;
}
