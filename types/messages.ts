export interface Message {
  message_id: string;
  sender_id: string;
  receiver_id: string;
  pet_id: string;
  content: string;
  created_at: Date;
  chat_id: string | null;
}

export interface InsertMessageData {
  sender_id: string;
  receiver_id: string;
  pet_id: string;
  content: string;
  created_at?: Date;
  chat_id?: string;
}

export interface UpdateMessageData {
  sender_id?: string;
  receiver_id?: string;
  pet_id?: string;
  content?: string;
  created_at?: Date;
  chat_id?: string;
}