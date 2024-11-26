import { getDB } from '../schema';

export interface Document {
  id?: number;
  user_id: number;
  type: string;
  file_path: string;
  status?: 'pending' | 'accepted' | 'rejected';
  uploaded_at?: string;
}

export const DocumentModel = {
  create: async (document: Document) => {
    try {
      const db = await getDB();
      
      // Check if document already exists
      const existing = db.exec(`
        SELECT id FROM documents 
        WHERE user_id = ? AND type = ?
      `, [document.user_id, document.type]);

      if (existing.length > 0 && existing[0].values.length > 0) {
        // Update existing document
        db.exec(`
          UPDATE documents 
          SET file_path = ?, status = ?, uploaded_at = CURRENT_TIMESTAMP
          WHERE user_id = ? AND type = ?
        `, [document.file_path, document.status || 'pending', document.user_id, document.type]);
      } else {
        // Insert new document
        db.exec(`
          INSERT INTO documents (user_id, type, file_path, status)
          VALUES (?, ?, ?, ?)
        `, [document.user_id, document.type, document.file_path, document.status || 'pending']);
      }

      return { success: true };
    } catch (error) {
      console.error('Error creating/updating document:', error);
      throw error;
    }
  },

  findByUserId: async (userId: number) => {
    try {
      const db = await getDB();
      const result = db.exec(`
        SELECT * FROM documents WHERE user_id = ?
      `, [userId]);

      if (!result.length) return [];

      const columns = result[0].columns;
      return result[0].values.map((row: any[]) => {
        return columns.reduce((obj: any, col: string, index: number) => {
          obj[col] = row[index];
          return obj;
        }, {});
      });
    } catch (error) {
      console.error('Error finding documents:', error);
      return [];
    }
  },

  updateStatus: async (id: number, status: string) => {
    try {
      const db = await getDB();
      db.exec(`
        UPDATE documents 
        SET status = ? 
        WHERE id = ?
      `, [status, id]);
      return { success: true };
    } catch (error) {
      console.error('Error updating document status:', error);
      throw error;
    }
  }
};