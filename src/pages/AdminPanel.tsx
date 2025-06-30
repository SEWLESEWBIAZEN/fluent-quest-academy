
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
          <TabsList className="mb-8">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            {user.role === 'admin' && <TabsTrigger value="settings">App Settings</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="courses">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Courses Management</h2>
              <Button>Create New Course</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Spanish for Beginners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex justify-between mb-1">
                      <span>Students</span>
                      <span>1,250</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Rating</span>
                      <span>4.5/5</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">View Analytics</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Intermediate French</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex justify-between mb-1">
                      <span>Students</span>
                      <span>950</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Rating</span>
                      <span>4.7/5</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">View Analytics</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-dashed border-2 flex items-center justify-center">
                <CardContent className="text-center p-6">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl ">+</span>
                  </div>
                  <h3 className="font-medium mb-2">Add New Course</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Create a new language course</p>
                  <Button>Create Course</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  View and manage your students. Track their progress and engagement.
                </p>
                <div className="mt-6">
                  <p className="text-gray-500 dark:text-gray-400">Student data will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your scheduled appointments with students.
                </p>
                <div className="mt-6">
                  <p className="text-gray-500 dark:text-gray-400">Your calendar will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {user?.role === 'admin' && (
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Application Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage global application settings, languages, and feature toggles.
                  </p>
                  <div className="mt-6">
                    <p className="text-gray-500 dark:text-gray-400">Settings controls will appear here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPanel;
