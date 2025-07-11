
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useCourse } from '@/contexts/CourseContext';
import CourseCard from '@/components/courses/CourseCard';
import LanguageFilter from '@/components/courses/LanguageFilter';
import LevelFilter from '@/components/courses/LevelFilter';
import { Input } from '@/components/ui/input';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Courses: React.FC = () => {
  const { courses, languages, languageLevels } = useCourse();
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string >(null);

  const {user} = useAuth();
  
  // Redirect to login if not authenticated
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    
    
  const filteredCourses = courses.filter((course) => {
    // Filter by search term
    if (search && !course?.title?.toLowerCase().includes(search.toLowerCase()) && 
        !course?.description?.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    // Filter by language
    if (selectedLanguage && course.language_id !== selectedLanguage) {
      return false;
    }
    
    // Filter by level
    if (selectedLevel && course.language_level !== selectedLevel) {
      return false;
    }
    
    return true;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-4">Explore Our Courses</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover a wide range of language courses taught by expert instructors.
          </p>
        </div>
        
        <div className="mb-8">
          <Input
            type="search"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-background p-6 rounded-lg border dark:border-gray-800 border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-300">Filters</h2>

              <LanguageFilter
                languages={languages}
                selectedLanguage={selectedLanguage}
                onChange={(value) => setSelectedLanguage(value || null)}
              />              
              <LevelFilter
                selectedLevel={selectedLevel}
                onChange={setSelectedLevel}
              />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses?.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>  
            ) : (
              <div className="text-center py-12">
                <p className="text-2xl font-medium text-gray-600 dark:text-gray-400">No courses found</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
