import { Course } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

interface ManageCourseProps {
    course: Course;
}

const ManageCourse: React.FC<ManageCourseProps> = ({ course }) => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex justify-between mb-1">
                        <span>Students</span>
                        {/* <span>{course?.enrolledStudents  }</span> */}
                        <span>0</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Average Rating</span>
                        <span>{(course.rating / 5).toFixed(1)}</span>
                    </div>
                </div>
                <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">View Analytics</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ManageCourse
