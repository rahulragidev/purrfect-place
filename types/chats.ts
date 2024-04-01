export interface Chat {
  id: string;
  pet_id: string | null;
  adopter_id: string | null;
  provider_id: string | null;
  created_at: Date;
}

export interface InsertChatData {
  pet_id?: string;
  adopter_id?: string;
  provider_id?: string;
  created_at?: Date;
}

export interface UpdateChatData {
  pet_id?: string;
  adopter_id?: string;
  provider_id?: string;
  created_at?: Date;
}