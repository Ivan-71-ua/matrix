import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { onAuthStateChanged, User } from 'firebase/auth';

import { getUserData } from '@/api/user';
import { TUser } from '@/types/auth';

import { auth } from '../firebase/firebaseConfig';

interface AuthContextType {
  user: TUser | null;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (currentUser: User | null) => {
      if (currentUser) {
        const userData = await getUserData(currentUser.uid);

        setUser(userData);
        localStorage.setItem('userRole', userData.role);
      } else {
        setUser(null);
        localStorage.removeItem('userRole');
      }
      setIsLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      fetchUserData(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthProvider. Ensure your component is wrapped inside <AuthProvider>.',
    );
  }
  return context;
};

export { AuthProvider, useAuthContext };
