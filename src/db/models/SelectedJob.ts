import { getDB } from '../schema';

export interface SelectedJob {
  user_id: number;
  job_id: string;
  job_title: string;
}

export const SelectedJobModel = {
  create: async (job: SelectedJob) => {
    try {
      const db = await getDB();
      const stmt = db.prepare(`
        INSERT INTO selected_jobs (user_id, job_id, job_title)
        VALUES (?, ?, ?)
      `);
      
      return stmt.run([job.user_id, job.job_id, job.job_title]);
    } catch (error) {
      console.error('Error creating selected job:', error);
      throw error;
    }
  },

  findByUserId: async (userId: number) => {
    try {
      const db = await getDB();
      const stmt = db.prepare('SELECT * FROM selected_jobs WHERE user_id = ?');
      return stmt.get([userId]);
    } catch (error) {
      console.error('Error finding selected job:', error);
      return null;
    }
  }
};