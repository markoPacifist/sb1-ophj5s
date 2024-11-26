import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserModel } from '../db/models/User';
import { DocumentModel } from '../db/models/Document';
import { ConsultationModel } from '../db/models/Consultation';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; redirectTo?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const checkUserProgress = async (userId: number) => {
    try {
      // Check documents
      const documents = await DocumentModel.findByUserId(userId);
      const hasPassport = documents.some(doc => 
        doc.type === 'passport' && doc.status !== 'rejected'
      );
      
      if (!hasPassport) {
        return '/documents';
      }

      // Check consultation
      const consultation = await ConsultationModel.findByUserId(userId);
      if (!consultation) {
        return '/consultation';
      }

      // If all steps are completed, redirect to client panel
      return '/client';
    } catch (error) {
      console.error('Error checking user progress:', error);
      return '/client';
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await UserModel.validateLogin(email, password);
      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(result.user));

        // Check user progress and get redirect path
        const redirectTo = await checkUserProgress(result.user.id!);
        return { success: true, redirectTo };
      }
      return { success: false, error: result.error || 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}