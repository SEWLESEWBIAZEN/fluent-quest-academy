
import React from 'react';
import { Link } from 'react-router-dom';
import { useCourse } from '@/contexts/CourseContext';
import CourseCard from '@/components/courses/CourseCard';
import { Button } from '@/components/ui/button';

const PopularCoursesSection: React.FC = () => {
  const { courses } = useCourse();
  
  // Take just the first 3 courses for the homepage
  const popularCourses = courses.slice(0, 3);
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-2">Popular Courses</h2>
            <p className="text-gray-600 dark:text-gray-400">Explore our most popular language courses</p>
          </div>
          <Link to="/courses">
            <Button variant="outline">View All Courses</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;
