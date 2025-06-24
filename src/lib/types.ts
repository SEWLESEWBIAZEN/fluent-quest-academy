

// Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "admin" | "user";
  lastLogin?: Date;
  twoFactorEnabled: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  sessionExpiry: Date | null;
}