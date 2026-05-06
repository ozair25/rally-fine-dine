import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  userProfile: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Check if user is admin
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        // Bootstrap: If specific email, grant admin access to allow initializing the database
        const adminEmails = ['sayedozair25@gmail.com', 'admin@rally.com'];
        setIsAdmin(adminDoc.exists() || adminEmails.includes(user.email || ''));
        
        // Load user profile
        const profileDoc = await getDoc(doc(db, 'users', user.uid));
        if (profileDoc.exists()) {
          setUserProfile(profileDoc.data());
        }
      } else {
        setIsAdmin(false);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, userProfile }}>
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
