import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCourse } from '@/contexts/CourseContext';
import Layout from '@/components/layout/Layout';
import CourseCard from '@/components/courses/CourseCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import CircularProgress from '@/components/layout/CircularProgress';

const Dashboard: React.FC = () => {
  const { user,isLoading } = useAuth();
  const { courses, getUserProgress } = useCourse();
  if (isLoading) return <CircularProgress full/>;

    // Redirect to login if not authenticated
  if (!user && !isLoading) {
    return <Navigate to="/login" replace />;
  }
    
  if (!user?.registered) {
    return <Navigate to="/register/complete" replace />;
  }  

  // Get enrolled courses
  const enrolledCourses =[]
  //  courses.filter(course => 
  //   user?.enrolledCourses.includes(course.id)
  // );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-2">Welcome, {user?.name}!</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your progress and continue learning</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
            <div className="flex items-center bg-background px-4 py-2 rounded-lg">
              <span className="text-yellow-500 text-lg mr-2">🔥</span>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current streak</p>
                <p className="font-bold text-gray-800 dark:text-gray-300">{user?.days} days</p>
              </div>
            </div>
            <div className="flex items-center bg-background text-gray-600 dark:text-gray-400 px-4 py-2 rounded-lg">
              <span className="text-blue-500 text-lg mr-2">⭐</span>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Experience points</p>
                <p className="font-bold text-gray-800 dark:text-gray-300">{user.points} XP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background p-6 rounded-lg shadow-sm border dark:border-gray-800 mb-12">
          <h2 className="text-xl font-bold mb-6">Your Learning Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background p-4 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Daily Goal</p>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">15 min / day</span>
                <span>10 min completed</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div className="bg-background p-4 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Weekly Goal</p>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">5 days / week</span>
                <span>3 days completed</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="bg-background p-4 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Total Lessons Completed</p>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">All time</span>
                <span>24 lessons</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">My Enrolled Courses</h2>
            <Link to="/courses">
              <Button variant="outline">Explore More Courses</Button>
            </Link>
          </div>
          
          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  progress={getUserProgress(course.id)} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center bg-background py-12 rounded-lg border border-dashed dark:border-gray-800">
              <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't enrolled in any courses yet</p>
              <Link to="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </div>
          )}
        </div>
        
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Recommended For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses?.slice(0, 4)?.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
