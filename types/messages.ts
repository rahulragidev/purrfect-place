export interface Message {
  id: number;
  sender_id: string;
  receiver_id: string;
  pet_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  chat_id: string;
}