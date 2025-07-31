import { Card, CardContent } from '@/components/ui/card';

import CreateCourse from './CreateCourse';
import { useCourse } from '@/contexts/CourseContext';
import { Course } from '@/lib/types';
import ManageCourse from './ManageCourse';

const CoursesManagement = () => {
    const { languages, languageLevels, teachers, courses } = useCourse();
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Courses Management</h2>
                <CreateCourse languages={languages} languageLevels={languageLevels} teachers={teachers} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses?.map((course: Course) => (
                    <ManageCourse key={course._id} course={course} />
                ))}

                {
                    courses.length === 0 && (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3">
                            <p className="text-center text-gray-500 dark:text-gray-400">
                                No courses available
                            </p>
                        </div>
                    )
                }



                < Card className="border-dashed border-2 flex items-center justify-center" >
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

        </div >
    )
}

export default CoursesManagement
