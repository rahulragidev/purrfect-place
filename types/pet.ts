export interface Pet {
  pet_id: string;
  name: string | null;
  type: string | null;
  breed: string | null;
  age: number | null;
  description: string | null;
  status: string | null;
  provider_user_id: string;
  adopter_user_id: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: Date;
  updated_at: Date | null;
  photos: string[] | null;
  additional_info: object | null;
}

export interface InsertPetData {
  name?: string;
  type?: string;
  breed?: string;
  age?: number;
  description?: string;
  status?: string;
  provider_user_id: string;
  adopter_user_id?: string;
  latitude?: number;
  longitude?: number;
  created_at?: Date;
  updated_at?: Date;
  photos?: string[];
  additional_info?: object;
}

export interface UpdatePetData {
  name?: string;
  type?: string;
  breed?: string;
  age?: number;
  description?: string;
  status?: string;
  provider_user_id?: string;
  adopter_user_id?: string;
  latitude?: number;
  longitude?: number;
  updated_at?: Date;
  photos?: string[];
  additional_info?: object;
}