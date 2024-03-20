export interface Pet {
  pet_id: string; // UUID, automatically generated
  name: string | null;
  type: string | null;
  breed: string | null;
  age: number | null; // integer
  description: string | null;
  status: 'available' | 'adopted' | null;
  provider_user_id: string; // UUID
  adopter_user_id: string | null; // UUID, can be null
  latitude: number | null; // numeric(9,6)
  longitude: number | null; // numeric(9,6)
  created_at: Date; // timestamp with time zone
  updated_at: Date | null; // timestamp with time zone
  photos: string[] | null; // array of text, representing URLs to photos
}
