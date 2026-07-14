'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone?: string;
  memberSince: string;
  avatarInitials: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  firstName: "Alex",
  lastName: "Rider",
  displayName: "Alex Rider",
  email: "alex@streetrevolution.com",
  phone: "+1 (555) 014-9090",
  memberSince: "2023",
  avatarInitials: "AR",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check localStorage for active session on load
    const storedUser = localStorage.getItem('ub_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock verification
    if (email.toLowerCase() === 'alex@streetrevolution.com') {
      setUser(DEMO_USER);
      localStorage.setItem('ub_user', JSON.stringify(DEMO_USER));
      setIsLoading(false);
      return { success: true };
    } else if (email.trim() && password.length >= 6) {
      // Allow login for other users with any password >= 6 chars for testing convenience
      const displayName = email.split('@')[0];
      const newUser: User = {
        firstName: displayName.charAt(0).toUpperCase() + displayName.slice(1),
        lastName: "User",
        displayName: displayName.charAt(0).toUpperCase() + displayName.slice(1),
        email: email,
        memberSince: new Date().getFullYear().toString(),
        avatarInitials: displayName.substring(0, 2).toUpperCase(),
      };
      setUser(newUser);
      localStorage.setItem('ub_user', JSON.stringify(newUser));
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: "Invalid credentials. Try alex@streetrevolution.com with any password." };
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!email.includes('@')) {
      setIsLoading(false);
      return { success: false, error: "Please enter a valid email address." };
    }
    if (password.length < 6) {
      setIsLoading(false);
      return { success: false, error: "Password must be at least 6 characters." };
    }

    const initials = (firstName.substring(0, 1) + lastName.substring(0, 1)).toUpperCase();
    const newUser: User = {
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
      email,
      memberSince: new Date().getFullYear().toString(),
      avatarInitials: initials || "SR",
    };

    setUser(newUser);
    localStorage.setItem('ub_user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ub_user');
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (user) {
      const merged = { ...user, ...updatedUser };
      setUser(merged);
      localStorage.setItem('ub_user', JSON.stringify(merged));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
