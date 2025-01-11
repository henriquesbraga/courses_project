export type Course = {
  id: number;
  title: string;
  description: string;
  hours: number;
  created_at: string;
  enrolled_at?: string | null;
}