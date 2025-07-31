import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import CreateCourse from './CreateCourse';
import { useEffect, useState } from 'react';
import { Course, Language, LanguageLevel, UserData } from '@/lib/types';
import axios from 'axios';
import { apiUrl } from '@/lib/envService';
import { useAuth } from '@/contexts/AuthContext';

const CoursesManagement = () => {
    const { user } = useAuth()
    const [languages, setLanguages] = useState<Language[]>([]);
    const [languageLevels, setLanguageLevels] = useState<LanguageLevel[]>([]);
    const [teachers, setTeachers] = useState<UserData[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

    const getCoursesUrl = user?.role === 'admin' ? `${apiUrl}/courses/getAll` : `${apiUrl}/courses/getByInstructor/${user?.userId}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    authToken: user?.accessToken ?? ""
                };

                const [languagesRes, levelsRes, teachersRes, coursesRes] = await Promise.allSettled([
                    axios.get(`${apiUrl}/languages/getAll`, { headers }),
                    axios.get(`${apiUrl}/languageLevels/getAll`, { headers }),
                    axios.get(`${apiUrl}/users/getAllTeachers`, { headers }),
                    axios.get(getCoursesUrl, { headers })
                ]);

                if (languagesRes.status === 'fulfilled') {
                    setLanguages(languagesRes.value.data.data);
                } else {
                    console.warn('Failed to fetch course language:', languagesRes.reason);
                }

                if (levelsRes.status === 'fulfilled') {
                    setLanguageLevels(levelsRes.value.data.data);
                } else {
                    console.warn('Failed to fetch course levels:', levelsRes.reason);
                }

                if (teachersRes.status === 'fulfilled') {
                    setTeachers(teachersRes.value.data.data);
                } else {
                    console.warn('Failed to fetch teachers:', teachersRes.reason);
                }

                if (coursesRes.status === 'fulfilled') {
                    setCourses(coursesRes.value.data.data);
                } else {
                    console.warn('Failed to fetch courses:', coursesRes.reason);
                }

            } catch (error: any) {
                console.error("Error fetching initial data:", error?.message);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Courses Management</h2>
                <CreateCourse languages={languages} languageLevels={languageLevels} teachers={teachers} />
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
                        <CreateCourse languages={languages} languageLevels={languageLevels} teachers={teachers} />
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

export default CoursesManagement
