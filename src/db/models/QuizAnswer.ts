import { getDB } from '../schema';

export interface QuizAnswer {
  user_id: number;
  question_id: string;
  answer: string;
}

export const QuizAnswerModel = {
  create: async (answer: QuizAnswer) => {
    try {
      const db = await getDB();
      const stmt = db.prepare(`
        INSERT INTO quiz_answers (user_id, question_id, answer)
        VALUES (?, ?, ?)
      `);
      
      return stmt.run([answer.user_id, answer.question_id, answer.answer]);
    } catch (error) {
      console.error('Error creating quiz answer:', error);
      throw error;
    }
  },

  findByUserId: async (userId: number) => {
    try {
      const db = await getDB();
      const stmt = db.prepare('SELECT * FROM quiz_answers WHERE user_id = ?');
      return stmt.all([userId]);
    } catch (error) {
      console.error('Error finding quiz answers:', error);
      return null;
    }
  }
};