
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LanguageManagement from '@/components/languages/LanguageManagement';
import ApplicationSettings from '@/components/generals/ApplicationSettings';
import AppointmentSettings from '@/components/appointments/AppointmentSettings';
import StudentManagement from '@/components/students/StudentManagement';
import CoursesManagement from '@/components/courses/CoursesManagement';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();

  // Redirect if not logged in or not a teacher/admin
  if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
    return <Navigate to="/login" replace />;
  }
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-8">Admin Panel</h1>
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="mb-8 flex-1 flex-wrap justify-start">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            {user.role === 'admin' && <TabsTrigger value="languages">Languages</TabsTrigger>}
            {user.role === 'admin' && <TabsTrigger value="settings">App Settings</TabsTrigger>}
          </TabsList>

          <TabsContent value="courses">
            <CoursesManagement/>
          </TabsContent>
          <TabsContent value="students">
            <StudentManagement/>
          </TabsContent>
          <TabsContent value="appointments">
            <AppointmentSettings/>
          </TabsContent>
          {user?.role === 'admin' && (
            <TabsContent value="settings">
              <ApplicationSettings/>
            </TabsContent>
          )}
          <TabsContent value="languages">
            <LanguageManagement/>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPanel;
