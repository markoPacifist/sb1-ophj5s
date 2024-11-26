import { getDB } from '../schema';

export interface Consultation {
  id?: number;
  user_id: number;
  date: string;
  time: string;
  type: 'video' | 'phone';
  status?: 'scheduled' | 'completed' | 'cancelled';
  created_at?: string;
}

export const ConsultationModel = {
  create: async (consultation: Consultation) => {
    const db = await getDB();
    try {
      const stmt = db.prepare(`
        INSERT INTO consultations (user_id, date, time, type, status)
        VALUES (?, ?, ?, ?, ?)
      `);
      
      return stmt.run([
        consultation.user_id,
        consultation.date,
        consultation.time,
        consultation.type,
        consultation.status || 'scheduled'
      ]);
    } catch (error) {
      console.error('Error creating consultation:', error);
      throw error;
    }
  },

  findByUserId: async (userId: number) => {
    const db = await getDB();
    try {
      const stmt = db.prepare('SELECT * FROM consultations WHERE user_id = ?');
      return stmt.get([userId]);
    } catch (error) {
      console.error('Error finding consultation:', error);
      return null;
    }
  },

  updateStatus: async (id: number, status: string) => {
    const db = await getDB();
    try {
      const stmt = db.prepare('UPDATE consultations SET status = ? WHERE id = ?');
      return stmt.run([status, id]);
    } catch (error) {
      console.error('Error updating consultation status:', error);
      throw error;
    }
  }
};