import { getDB } from '../schema';
import { hashPassword, comparePassword } from '../utils/auth';

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
  country: string;
  created_at?: string;
}

export const UserModel = {
  create: async (user: User) => {
    try {
      const db = await getDB();
      
      // Check if email already exists
      const emailResult = db.exec(`
        SELECT email FROM users WHERE email = ?;
      `, [user.email]);
      
      if (emailResult.length > 0 && emailResult[0].values.length > 0) {
        return { success: false, error: 'Email already exists' };
      }

      // Check if phone already exists
      const phoneResult = db.exec(`
        SELECT phone FROM users WHERE phone = ?;
      `, [user.phone]);
      
      if (phoneResult.length > 0 && phoneResult[0].values.length > 0) {
        return { success: false, error: 'Phone number already registered' };
      }
      
      // Hash password
      const hashedPassword = user.password ? await hashPassword(user.password) : '';
      
      // Insert new user
      db.exec(`
        INSERT INTO users (name, email, password, phone, country)
        VALUES (?, ?, ?, ?, ?);
      `, [user.name, user.email, hashedPassword, user.phone, user.country]);
      
      // Get the created user
      const userResult = db.exec(`
        SELECT id, name, email, phone, country, created_at 
        FROM users 
        WHERE email = ?;
      `, [user.email]);
      
      if (!userResult.length || !userResult[0].values.length) {
        throw new Error('Failed to create user');
      }

      // Convert result to user object
      const columns = userResult[0].columns;
      const values = userResult[0].values[0];
      const createdUser = columns.reduce((obj: any, col: string, index: number) => {
        obj[col] = values[index];
        return obj;
      }, {});

      return { success: true, user: createdUser };
    } catch (error: any) {
      console.error('Error creating user:', error);
      return { 
        success: false, 
        error: error.message || 'Error creating user'
      };
    }
  },

  validateLogin: async (email: string, password: string) => {
    try {
      const db = await getDB();
      const result = db.exec(`
        SELECT * FROM users WHERE email = ?;
      `, [email]);

      if (!result.length || !result[0].values.length) {
        return { success: false, error: 'User not found' };
      }

      const columns = result[0].columns;
      const values = result[0].values[0];
      const user = columns.reduce((obj: any, col: string, index: number) => {
        obj[col] = values[index];
        return obj;
      }, {});

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        return { success: false, error: 'Invalid password' };
      }

      // Remove password from user object before returning
      const { password: _, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Error validating login:', error);
      return { success: false, error: 'Login error' };
    }
  }
};