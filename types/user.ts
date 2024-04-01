export interface User {
  user_id: string;
  full_name: string | null;
  phone_number: string | null;
  email: string;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip_code: string | null;
  user_photo_url: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string | null;
}

export interface InsertUserData {
  user_id: string;
  full_name?: string;
  phone_number?: string;
  email: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  user_photo_url?: string;
  latitude?: number;
  longitude?: number;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateUserData {
  full_name?: string;
  phone_number?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  user_photo_url?: string;
  latitude?: number;
  longitude?: number;
  updated_at?: string;
}