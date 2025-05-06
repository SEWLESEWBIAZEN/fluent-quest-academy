
import React, { createContext, useContext, useState } from "react";

export interface Language {
  id: string;
  name: string;
  code: string;
  flag: string;
}

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface Course {
  id: string;
  title: string;
  description: string;
  language: Language;
  level: CourseLevel;
  teacherId: string;
  imageUrl: string;
  duration: number; // in minutes
  totalLessons: number;
  rating: number;
  studentCount: number;
  price: number; // 0 for free courses
}

export interface Lesson {
  id: string;
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
  lessons: Record<string, Lesson[]>; // courseId -> lessons
  enrollInCourse: (courseId: string) => void;
  getUserProgress: (courseId: string) => number;
  getCoursesByLanguage: (languageId: string) => Course[];
  getCoursesByLevel: (level: CourseLevel) => Course[];
  getCourseById: (id: string) => Course | undefined;
  getLessonsByCourseId: (courseId: string) => Lesson[];
}

// Mock data
const MOCK_LANGUAGES: Language[] = [
  { id: '1', name: 'Spanish', code: 'es', flag: '🇪🇸' },
  { id: '2', name: 'French', code: 'fr', flag: '🇫🇷' },
  { id: '3', name: 'German', code: 'de', flag: '🇩🇪' },
  { id: '4', name: 'Japanese', code: 'ja', flag: '🇯🇵' },
  { id: '5', name: 'Mandarin', code: 'zh', flag: '🇨🇳' },
];

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Spanish for Beginners',
    description: 'Learn the basics of Spanish with our comprehensive course for beginners.',
    language: MOCK_LANGUAGES[0],
    level: 'beginner',
    teacherId: '2',
    imageUrl: '/placeholder.svg',
    duration: 600, // 10 hours
    totalLessons: 20,
    rating: 4.5,
    studentCount: 1250,
    price: 0,
  },
  {
    id: '2',
    title: 'Intermediate French',
    description: 'Take your French to the next level with our intermediate course.',
    language: MOCK_LANGUAGES[1],
    level: 'intermediate',
    teacherId: '2',
    imageUrl: '/placeholder.svg',
    duration: 720, // 12 hours
    totalLessons: 24,
    rating: 4.7,
    studentCount: 950,
    price: 29.99,
  },
  {
    id: '3',
    title: 'Business German',
    description: 'Learn German for business contexts and professional communication.',
    language: MOCK_LANGUAGES[2],
    level: 'advanced',
    teacherId: '2',
    imageUrl: '/placeholder.svg',
    duration: 540, // 9 hours
    totalLessons: 18,
    rating: 4.8,
    studentCount: 780,
    price: 39.99,
  },
  {
    id: '4',
    title: 'Japanese for Travelers',
    description: 'Master essential Japanese phrases and cultural tips for your trip to Japan.',
    language: MOCK_LANGUAGES[3],
    level: 'beginner',
    teacherId: '2',
    imageUrl: '/placeholder.svg',
    duration: 420, // 7 hours
    totalLessons: 14,
    rating: 4.6,
    studentCount: 1500,
    price: 19.99,
  },
  {
    id: '5',
    title: 'Mandarin Conversation Skills',
    description: 'Enhance your Mandarin speaking abilities with interactive conversation practice.',
    language: MOCK_LANGUAGES[4],
    level: 'intermediate',
    teacherId: '2',
    imageUrl: '/placeholder.svg',
    duration: 660, // 11 hours
    totalLessons: 22,
    rating: 4.9,
    studentCount: 850,
    price: 34.99,
  },
];

// Mock lessons for the first course
const MOCK_LESSONS: Record<string, Lesson[]> = {
  '1': [
    {
      id: '101',
      courseId: '1',
      title: 'Introduction to Spanish',
      content: 'In this lesson, we will introduce you to the Spanish language and its importance.',
      type: 'video',
      duration: 15,
      order: 1,
    },
    {
      id: '102',
      courseId: '1',
      title: 'Basic Greetings',
      content: 'Learn how to greet people in Spanish and introduce yourself.',
      type: 'video',
      duration: 20,
      order: 2,
    },
    {
      id: '103',
      courseId: '1',
      title: 'Numbers 1-20',
      content: 'Master counting from 1 to 20 in Spanish.',
      type: 'text',
      duration: 30,
      order: 3,
    },
    {
      id: '104',
      courseId: '1',
      title: 'Lesson 1 Quiz',
      content: 'Test your knowledge of the first three lessons.',
      type: 'quiz',
      duration: 15,
      order: 4,
    },
  ],
  '2': [
    {
      id: '201',
      courseId: '2',
      title: 'Intermediate French Grammar',
      content: 'Dive into more complex French grammar structures.',
      type: 'video',
      duration: 25,
      order: 1,
    },
    {
      id: '202',
      courseId: '2',
      title: 'French Conversational Practice',
      content: 'Practice French conversations at an intermediate level.',
      type: 'video',
      duration: 30,
      order: 2,
    },
  ],
};

// Create the context
const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses] = useState<Course[]>(MOCK_COURSES);
  const [languages] = useState<Language[]>(MOCK_LANGUAGES);
  const [lessons] = useState<Record<string, Lesson[]>>(MOCK_LESSONS);
  const [userProgress] = useState<Record<string, number>>({
    '1': 25, // 25% progress in course 1
  });

  const enrollInCourse = (courseId: string) => {
    console.log(`Enrolling in course with ID: ${courseId}`);
    // In a real app, this would update the user's enrolled courses in the backend
  };

  const getUserProgress = (courseId: string) => {
    return userProgress[courseId] || 0;
  };

  const getCoursesByLanguage = (languageId: string) => {
    return courses.filter((course) => course.language.id === languageId);
  };

  const getCoursesByLevel = (level: CourseLevel) => {
    return courses.filter((course) => course.level === level);
  };

  const getCourseById = (id: string) => {
    return courses.find((course) => course.id === id);
  };

  const getLessonsByCourseId = (courseId: string) => {
    return lessons[courseId] || [];
  };

  return (
    <CourseContext.Provider
      value={{
        languages,
        courses,
        lessons,
        enrollInCourse,
        getUserProgress,
        getCoursesByLanguage,
        getCoursesByLevel,
        getCourseById,
        getLessonsByCourseId,
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
