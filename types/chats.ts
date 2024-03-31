export interface Chat {
  id: string;
  petId: string ;
  adopterId: string;
  providerId: string;
  createdAt: string;
}

export interface InsertChatData {
  petId?: string;
  adopterId?: string;
  providerId?: string;
  createdAt?: string;
}

export interface UpdateChatData {
  petId?: string;
  adopterId?: string;
  providerId?: string;
  createdAt?: string;
}