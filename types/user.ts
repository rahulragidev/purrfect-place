export interface User {
  user_id: string; // UUID
  full_name: string | null;
  phone_number: string | null;
  email: string;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip_code: string | null;
  user_photo_url: string | null;
  latitude: number | null; // numeric(9,6)
  longitude: number | null; // numeric(9,6)
  created_at: Date; // timestamp with time zone
  updated_at: Date | null; // timestamp with time zone
}
