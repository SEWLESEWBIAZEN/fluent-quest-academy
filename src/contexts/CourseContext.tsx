import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { Course, Language, LanguageLevel, UserData } from "@/lib/types";
import coursesData from '../lib/data/courses'
import languagesData from '../lib/data/languages'
import languageLevelsData from '../lib/data/language-levels'
import teachersData from '../lib/data/users'
import { toast } from "@/hooks/use-toast";

export interface Lesson {
  _id: string;
  courseId: string;
  title: string;
  content: string;
  type: "video" | "text" | "quiz";
  duration: number; // in minutes
  order: number;
}

interface CourseContextType {
  languages: Language[];
  courses: Course[];
  languageLevels: LanguageLevel[];
  enrollInCourse: (courseId: string) => void;
  getUserProgress: (courseId: string) => number;
  getCoursesByLanguage: (languageId: string) => Course[];
  getCoursesByLevel: (level: string) => Course[];
  getCourseById: (id: string) => Course | undefined;
  teachers: UserData[];
}

// Create the context
const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<UserData[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [languageLevels, setLanguageLevels] = useState<LanguageLevel[]>([]);
  const [userProgress] = useState<Record<string, number>>({
    '1': 25,
  });

  const { user } = useAuth()
 
  useEffect(() => {
    const fetchData = async () => {
      const authToken = user?.accessToken ?? "";
      const [languagesRes, coursesRes, levelsRes, teachersRes] = await Promise.all([
        languagesData.getAll({ authToken }),
        user?.role === 'admin' ? coursesData.getAll({ authToken }) : coursesData.getByInstructor({ authToken, instructorId: user?.userId }),
        languageLevelsData.getAll({ authToken }),
        teachersData.getAll({ authToken }),
      ]);
      setLanguages(languagesRes?.data);
      setCourses(coursesRes?.data);
      setLanguageLevels(levelsRes?.data);
      setTeachers(teachersRes?.data);

    

      //if error fetching data, you can handle it here
      if(user){
        if (!languagesRes.success) toast({ title: "Error Occured", description: languagesRes.message, variant: "destructive" });
        if (!coursesRes.success) toast({ title: "Error Occured", description: coursesRes.message, variant: "destructive" });
        if (!levelsRes.success) toast({ title: "Error Occured", description: levelsRes.message, variant: "destructive" });
        if (!teachersRes.success) toast({ title: "Error Occured", description: teachersRes.message, variant: "destructive" });
      }
    };
    fetchData();
  }, [user]);

  const enrollInCourse = (courseId: string) => {
    // In a real app, this would update the user's enrolled courses in the backend
  };

  const getUserProgress = (courseId: string) => {
    return userProgress[courseId] || 0;
  };

  const getCoursesByLanguage = (languageId: string) => {
    return courses?.filter((course) => course.language_id === languageId);
  };

  const getCoursesByLevel = (level: string) => {
    return courses.filter((course) => course?.language_level === level);
  };

  const getCourseById = (id: string) => {
    return courses.find((course) => course._id === id);
  };

  return (
    <CourseContext.Provider
      value={{
        languages,
        courses,
        languageLevels,
        enrollInCourse,
        getUserProgress,
        getCoursesByLanguage,
        getCoursesByLevel,
        getCourseById,
        teachers
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
