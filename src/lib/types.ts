

// Authentication Types
export interface User {
  id: string;
  userId:string;
  username:string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  lastLogin?: Date;
  twoFactorEnabled: boolean;
  accessToken:string; 
  registered:boolean;
  days?:number;
  points?:number;
  enrolledCourses?:any[],
  verified?:boolean;
  
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

export type UserData ={
        _id: string,
        username: string,
        name: string,
        role: string,
        email: string,
        phoneNumber: string,
        avatar: string,
        streakDays: number,
        points: number,
        enrolledCourses: any[],
        verified: boolean,
        rating: number,
        createdAt: string,
        updatedAt: string
}
