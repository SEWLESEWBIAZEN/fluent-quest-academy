import { apiUrl } from "@/lib/envService";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { Course, Language, LanguageLevel, UserData } from "@/lib/types";


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
  // lessons: Record<string, Lesson[]>; // courseId -> lessons
  languageLevels: LanguageLevel[];
  enrollInCourse: (courseId: string) => void;
  getUserProgress: (courseId: string) => number;
  getCoursesByLanguage: (languageId: string) => Course[];
  getCoursesByLevel: (level: string) => Course[];
  getCourseById: (id: string) => Course | undefined;
  // getLessonsByCourseId: (courseId: string) => Lesson[];
}


// Create the context
const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<UserData[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [languageLevels, setLanguageLevels] = useState<LanguageLevel[]>([]);
  const [userProgress] = useState<Record<string, number>>({
    '1': 25, // 25% progress in course 1
  });

  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          authToken: user?.accessToken ?? ""
        };

        const [languagesRes, levelsRes, teachersRes, courseRes] = await Promise.all([
          axios.get(`${apiUrl}/languages/getAll`, { headers }),
          axios.get(`${apiUrl}/languageLevels/getAll`, { headers }),
          axios.get(`${apiUrl}/users/getAllTeachers`, { headers }),
          axios.get(`${apiUrl}/courses/getAll`, { headers })
        ]);

        setLanguages(languagesRes?.data?.data ?? []);
        setLanguageLevels(levelsRes?.data?.data ?? []);
        setTeachers(teachersRes?.data?.data ?? []);
        setCourses(courseRes?.data?.data ?? []);
      } catch (error: any) {
        console.error("Error fetching initial data:", error?.message);
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

  // const getLessonsByCourseId = (courseId: string) => {
  //   return lessons[courseId] || [];
  // };

  return (
    <CourseContext.Provider
      value={{
        languages,
        courses,
        // lessons,
        languageLevels,
        enrollInCourse,
        getUserProgress,
        getCoursesByLanguage,
        getCoursesByLevel,
        getCourseById,
        // getLessonsByCourseId,
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
