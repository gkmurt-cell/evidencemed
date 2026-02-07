import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
});

const USERS_KEY = "evidencemed_users";
const SESSION_KEY = "evidencemed_session";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (sessionData) {
      try {
        const savedUser = JSON.parse(sessionData);
        setUser(savedUser);
      } catch (e) {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const getUsers = (): Record<string, { password: string; id: string }> => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
    } catch {
      return {};
    }
  };

  const saveUsers = (users: Record<string, { password: string; id: string }>) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const signUp = async (email: string, password: string): Promise<{ error: string | null }> => {
    const users = getUsers();
    if (users[email]) {
      return { error: "User already exists" };
    }
    
    const newUser = {
      id: crypto.randomUUID(),
      password,
    };
    users[email] = newUser;
    saveUsers(users);

    const userData = { id: newUser.id, email };
    setUser(userData);
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    
    return { error: null };
  };

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    const users = getUsers();
    const userData = users[email];
    
    if (!userData || userData.password !== password) {
      return { error: "Invalid email or password" };
    }

    const sessionUser = { id: userData.id, email };
    setUser(sessionUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
