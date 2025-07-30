import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Lesson, useCourse } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { apiUrl } from '@/lib/envService';
import { Language, LanguageLevel } from '@/lib/types';
import { useDispatch } from 'react-redux';
import { setLessons } from '../../redux/features/courseSlice';
import CourseTabs from '../../components/courses/CourseTabs';
import CourseHighlight from '../../components/courses/CourseHighlight';
import CourseIntro from '../../components/courses/CourseIntro';
const CourseDetail: React.FC = () => {
  const dispatch = useDispatch();

  const { courseId } = useParams<{ courseId: string }>();
  const { getCourseById, enrollInCourse, getUserProgress } = useCourse();
  const { user } = useAuth();
  const [courseLanguage, setCourseLanguage] = useState<Language | null>(null);
  const [courseLevel, setCourseLevel] = useState<LanguageLevel | null>(null);
  const [courseLessons, setCourseLessons] = useState<Lesson[]>([]);

  const course = useMemo(() => {
    return courseId ? getCourseById(courseId) : undefined;
  }, [courseId, getCourseById]);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const isEnrolled = user?.enrolledCourses?.includes(course?._id);
  const progress = courseId ? getUserProgress(courseId) : 0;

  const handleEnroll = () => {
    if (!user) {

      return <Navigate to="/login" replace />;
    }
    enrollInCourse(course?._id);
  };

  useEffect(() => {
    const fetchLanguageById = async () => {
      try {
        const headers = {
          authToken: user?.accessToken ?? ""
        };
        const [courseLanguageRes, courseLevelsRes, courseLessonsRes] = await Promise.all([
          axios.get(`${apiUrl}/languages/getById/${course?.language_id}`, { headers }),
          axios.get(`${apiUrl}/languageLevels/getById/${course?.language_level}`, { headers }),
          axios.get(`${apiUrl}/lessons/getAll/${course?._id}`, { headers }),

        ]);
        setCourseLanguage(courseLanguageRes?.data?.data);
        setCourseLevel(courseLevelsRes?.data?.data);
        setCourseLessons(courseLessonsRes?.data?.data);
        dispatch(setLessons(courseLessonsRes?.data?.data));
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }
    fetchLanguageById();
  }, [course?._id, course?.language_id, course?.language_level, user]);


  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className='flex flex-1 justify-end mb-6 me-4'>
          <Button>
            <Link to={`/courses`} className='flex items-center gap-2 hover:ms-3  hover:text-primary'>
              <ArrowLeft size={16} /> <span>Back to courses list</span>
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* course intro */}
          <CourseIntro course={course} courseLanguage={courseLanguage} courseLevel={courseLevel} isEnrolled={isEnrolled} progress={progress} handleEnroll={handleEnroll} />

          <CourseHighlight course={course} courseLanguage={courseLanguage} />

        </div>

        <CourseTabs courseLessons={courseLessons} course={course} isEnrolled={isEnrolled} />
      </div>
    </Layout>
  );
};

export default CourseDetail;
