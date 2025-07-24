import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Course, Language, LanguageLevel } from '@/lib/types';
import axios from 'axios';
import { apiUrl } from '@/lib/envService';
import { useAuth } from '@/contexts/AuthContext';
import ReactCountryFlag from "react-country-flag"

interface CourseCardProps {
  course: Course;
  progress?: number; // 0-100
}

const CourseCard: React.FC<CourseCardProps> = ({ course, progress }) => {
  const [courseLanguage, setCourseLanguage] = useState<Language | null>(null);
  const [courseLevel, setCourseLevel] = useState<LanguageLevel | null>(null);

  const { user } = useAuth();

  const getLevelClass = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'language-level-beginner dark:bg-brand-800 dark:text-slate-200';
      case 'intermediate':
        return 'language-level-intermediate dark:bg-brand-800 dark:text-slate-200';
      case 'advanced':
        return 'language-level-advanced dark:bg-brand-800 dark:text-slate-200';
      default:
        return 'language-level-beginner dark:bg-brand-800 dark:text-slate-200';
    }
  };

   useEffect(() => {
    const fetchLanguageById = async () => {
      try {
        const headers = {
          authToken: user?.accessToken ?? ""
        };
        const [courseLanguageRes, courseLevelsRes] = await Promise.all([
          axios.get(`${apiUrl}/languages/getById/${course?.language_id}`, { headers }),
          axios.get(`${apiUrl}/languageLevels/getById/${course?.language_level}`, { headers }),
        ]);
        setCourseLanguage(courseLanguageRes?.data?.data);
        setCourseLevel(courseLevelsRes?.data?.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }      
    }
    fetchLanguageById();
  }, [course?._id, user]);
  const courseThumbnail = course?.thumbnail === "null" ? "/placeholder.svg" : course?.thumbnail;
 
  return (
    <Link to={`/courses/${course?._id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48 overflow-hidden">
          <img
            src={courseThumbnail || "/placeholder.svg"}
            alt={course?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge className={`${getLevelClass(courseLevel?.name?.toLowerCase())}`}>
              {courseLevel?.name?.charAt(0).toUpperCase() + courseLevel?.name?.slice(1)}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
              <ReactCountryFlag
                countryCode={courseLanguage?.flag || "US"}
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title={courseLanguage?.flag || "US"}
                width={24}
                height={12}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">{courseLanguage?.name}</span>
          </div>
          <h3 className="font-semibold text-lg mb-1">{course?.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{course?.description}</p>
          {/* <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{course?.totalLessons} lessons</span>
            <span>{Math.floor(course?.duration / 60)} hrs</span>
          </div> */}
        </CardContent>
        {/* <CardFooter className="px-4 py-3 bg-background border-t flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm font-medium">{course?.rating}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({course?.studentCount})</span>
          </div>
          <div>
            {course?.price === 0 ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Free</Badge>
            ) : (
              <span className="font-semibold">${course?.price?.toFixed(2)}</span>
            )}
          </div>
        </CardFooter> */}

        {progress !== undefined && (
          <div className="px-4 py-2 bg-white">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </Card>
    </Link>
  );
};

export default CourseCard;
