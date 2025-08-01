import DeleteCourse from '@/components/courses/DeleteCourse'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import { Lesson } from '@/contexts/CourseContext'
import { Course } from '@/lib/types'
import { Settings, Lock, Pen, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import CreateLesson from '../lessons/CreateLesson'

interface CourseTabsProps {
    courseLessons: Lesson[];
    course: Course;
    isEnrolled: boolean;
}

const CourseTabs: React.FC<CourseTabsProps> = ({ courseLessons, course, isEnrolled }) => {
    const { user } = useAuth()
    return (
        <Tabs defaultValue="lessons" className="w-full">
            <TabsList>
                <TabsTrigger value="lessons">Lessons</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger> | &nbsp;
                <TabsTrigger value="settings"><Settings className='h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded-full p-1' /></TabsTrigger>

            </TabsList>
            <TabsContent value="lessons" className="pt-6">
                <CreateLesson />
                <div className="space-y-4 mt-4">
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
                                        <div className='flex items-center gap-2'>
                                            <span onClick={
                                                (e) => {
                                                    e.preventDefault(); // Prevent link navigation
                                                    e.stopPropagation(); // Stop event bubbling up to Link
                                                }} className={`flex items-center gap-4 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border border-slate-200 dark:bg-transparent`}>

                                                {/* update the lesson */}
                                                <div><Pen className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                                                </div>

                                                {/* delete the lesson */}
                                                <div><Trash2 className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                                                </div>
                                            </span>
                                            <div>
                                                {isEnrolled ? (
                                                    <Button variant="outline" size="sm">Start</Button>
                                                ) : (
                                                    <Button variant="outline" size="sm" disabled><Lock /></Button>
                                                )}
                                            </div>
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
    )
}

export default CourseTabs
