// user_weights entity

export interface UserWeights {
  id: number;
  user_id: string;
  created_at: string;
  weight_kg: number;
  weight_lbs: number;
  body_fat_precentage: number;
  muscle_mass_kg: number;
  water_precentage: number;
  bone_mass_kg: number;
  notes: string;
  photo_url: string;
}
export interface CreateUserWeights {
  user_id: string;
  created_at: string;
  weight_kg: number;
  weight_lbs: number;
  body_fat_precentage?: number;
  muscle_mass_kg?: number;
  water_precentage?: number;
  bone_mass_kg?: number;
  notes?: string;
  photo_url?: string;
}
