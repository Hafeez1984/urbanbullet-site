'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SessionProvider, useSession, signIn, signOut as nextAuthSignOut } from 'next-auth/react';

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

const AuthContextInternal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }

    if (session?.user) {
      const name = session.user.name || 'Google User';
      const email = session.user.email || '';
      const nameParts = name.split(' ');
      const firstName = nameParts[0] || 'Google';
      const lastName = nameParts.slice(1).join(' ') || 'User';
      const initials = (firstName.substring(0, 1) + lastName.substring(0, 1)).toUpperCase();

      setUser({
        firstName,
        lastName,
        displayName: name,
        email,
        phone: '',
        memberSince: new Date().getFullYear().toString(),
        avatarInitials: initials || 'GU',
      });
    } else {
      const storedUser = localStorage.getItem('ub_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse stored user", e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
    setIsLoading(false);
  }, [session, status]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';
    if (isStatic) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (email.toLowerCase() === 'alex@streetrevolution.com') {
        setUser(DEMO_USER);
        localStorage.setItem('ub_user', JSON.stringify(DEMO_USER));
      } else if (email.trim() && password.length >= 6) {
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
      } else {
        setIsLoading(false);
        return { success: false, error: "Invalid credentials. Try alex@streetrevolution.com with any password." };
      }
      setIsLoading(false);
      return { success: true };
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setIsLoading(false);
        return { success: false, error: result.error || 'Invalid credentials' };
      }

      if (email.toLowerCase() === 'alex@streetrevolution.com') {
        setUser(DEMO_USER);
        localStorage.setItem('ub_user', JSON.stringify(DEMO_USER));
      } else {
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
      }
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: 'An unexpected authentication error occurred.' };
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';
    if (isStatic) {
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
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        firstName,
        lastName,
        isSignup: 'true',
        redirect: false,
      });

      if (result?.error) {
        setIsLoading(false);
        return { success: false, error: result.error || 'Registration failed' };
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
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: 'An unexpected registration error occurred.' };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('ub_user');
    const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';
    if (!isStatic) {
      await nextAuthSignOut({ redirect: true, callbackUrl: '/account' });
    }
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <AuthContextInternal>
        {children}
      </AuthContextInternal>
    </SessionProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
