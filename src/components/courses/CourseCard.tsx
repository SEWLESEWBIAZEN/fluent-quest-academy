
import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '@/contexts/CourseContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CourseCardProps {
  course: Course;
  progress?: number; // 0-100
}

const CourseCard: React.FC<CourseCardProps> = ({ course, progress }) => {
  const getLevelClass = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'language-level-beginner';
      case 'intermediate':
        return 'language-level-intermediate';
      case 'advanced':
        return 'language-level-advanced';
      default:
        return 'language-level-beginner';
    }
  };

  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge className={getLevelClass(course.level)}>
              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <span className="text-lg font-bold mr-2">{course.language.flag}</span>
            <span className="text-sm text-gray-600">{course.language.name}</span>
          </div>
          <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{course.totalLessons} lessons</span>
            <span>{Math.floor(course.duration / 60)} hrs</span>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm font-medium">{course.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({course.studentCount})</span>
          </div>
          <div>
            {course.price === 0 ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Free</Badge>
            ) : (
              <span className="font-semibold">${course.price.toFixed(2)}</span>
            )}
          </div>
        </CardFooter>
        
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
