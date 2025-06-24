

// Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  lastLogin?: Date;
  twoFactorEnabled: boolean;
  accessToken:string; 
  registered:boolean
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  sessionExpiry: Date | null;
}


export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin",
  User ='user',
  Guest = 'guest'
}
