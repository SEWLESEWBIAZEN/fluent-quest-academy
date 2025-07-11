

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

export type Language = {
  _id: string;
  name: string;
  code: string;
  description:string;
  flag:string;  
}
export type LanguageLevel = {
  _id: string;
  name: string;
  code: string;
  description:string;
  category:string;  
}

export type Course = {
  _id: string;
  code: string;
  title: string;
  description: string;
  language_id: string;
  language_level: string;
  teacherId: string;
  thumbnail: string; // or `null` if you want to explicitly allow null
  duration: number;
  rating: number;
  price: number;
  totalLessons:number;
  studentCount:number;
  createdAt: string; // or Date if parsed
  updatedAt: string; // or Date if parsed
};


