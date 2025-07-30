
import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Lesson, useCourse } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Lock, Plus, Settings } from 'lucide-react';
import axios from 'axios';
import { apiUrl } from '@/lib/envService';
import { Language, LanguageLevel } from '@/lib/types';
import ReactCountryFlag from 'react-country-flag';
import DeleteCourse from '@/components/courses/DeleteCourse';


const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourseById, enrollInCourse, getUserProgress } = useCourse();
  const { user } = useAuth();
  const [courseLanguage, setCourseLanguage] = useState<Language | null>(null);
  const [courseLevel, setCourseLevel] = useState<LanguageLevel | null>(null);
  const [courseLessons, setCourseLessons] = useState<Lesson[]>([]);

  const course = courseId ? getCourseById(courseId) : undefined;

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
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }
    fetchLanguageById();
  }, [course?._id, user]);

  const courseThumbnail = course?.thumbnail === "null" ? "/placeholder.svg" : course?.thumbnail;
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

          <div className="md:col-span-2">

            <div className="flex items-center mb-4">
              <ReactCountryFlag
                countryCode={courseLanguage?.flag || "US"}
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title={courseLanguage?.flag || "US"}
                width={24}
                height={12}
              />
              <span className="ms-2 text-lg text-gray-600 dark:text-gray-400">{courseLanguage?.name}</span>
              <div className={`ml-3 language-level-badge language-level-${courseLevel?.name?.toLowerCase()}`}>
                {courseLevel?.name?.charAt(0).toUpperCase() + courseLevel?.name?.slice(1)}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-4">{course.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{course.description}</p>

            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="font-medium">{course?.rating}</span>
                <span className="text-gray-500 ml-1">({course?.studentCount ?? 0} students)</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-1">🕒</span>
                <span>{(course.duration / 60).toFixed(2)} hours</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-1">📚</span>
                <span>{course.totalLessons} lessons</span>
              </div>
            </div>

            {isEnrolled && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Your progress</span>
                  <span>{progress}% complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {!isEnrolled && (
              <Button onClick={handleEnroll} size="lg" className="mb-6">
                {course.price === 0 ? 'Enroll for Free' : `Enroll for $${course.price.toFixed(2)}`}
              </Button>
            )}
          </div>

          <div className="md:col-span-1">
            <div className="bg-background rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <img
                src={courseThumbnail || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium mb-4">What you'll learn</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Master key {courseLanguage?.name} vocabulary</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Build practical conversation skills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Understand grammar fundamentals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Develop cultural awareness</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="lessons" className="w-full">
          <TabsList>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger> | &nbsp;
            <TabsTrigger value="settings"><Settings className='h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded-full p-1' /></TabsTrigger>

          </TabsList>
          <TabsContent value="lessons" className="pt-6">
            <div className="space-y-4">
              {courseLessons?.length > 0 ? (
                courseLessons?.map((lesson) => (
                  <Card key={lesson?._id}>
                    <Link to={`/courses/${course?._id}/lesson/${lesson?._id}`}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mr-4">
                            <span>{lesson?.order}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{lesson?.title}</h4>
                            <p className="text-sm text-gray-500">
                              {lesson?.duration} min • {lesson?.type.charAt(0).toUpperCase() + lesson?.type.slice(1)}
                            </p>
                          </div>
                        </div>
                        <div>
                          {isEnrolled ? (
                            <Button variant="outline" size="sm">Start</Button>
                          ) : (
                            <Button variant="outline" size="sm" disabled><Lock /></Button>
                          )}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No lessons available for this course yet.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="resources" className="pt-6">
            <div className="bg-background border dark:border-gray-900 border-gray-200  rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Additional resources will be available after enrollment.</p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="bg-background border dark:border-gray-900 border-gray-200  rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Reviews will appear here once students have completed the course.</p>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="pt-6">
            <div className="bg-background border dark:border-gray-900 border-gray-200  rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">Settings about the course will appear here.</p>
              <div className='flex gap-4 justify-end'>
                <Button variant="outline" size="sm" className="mt-4">Save Changes</Button>
                <DeleteCourse id={course?._id} accessToken={user?.accessToken} />
              </div>
            </div>

          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CourseDetail;
